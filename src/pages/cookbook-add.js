import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Nav from '../components/navbar';
import Footer from '../components/footer';

const RecipeList = ({ data, addToBook }) => {

    return (
        <>
            {data.map(recipe => (
                <li key={recipe._id} id={recipe._id}>{recipe.title}<button onClick={addToBook}>+</button></li>
            ))}
        </>
    )
}

const CookbookAdd = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [recipes, setRecipes] = useState([]);
    const [myRecipes, setMyRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            const results = await fetch('/api/recipe/getUserRecipes');
            const resultsJson = await results.json();
            setMyRecipes(resultsJson);
        })();
    }, []);

    const [value, setValue] = useState({
        title: '',
        description: ''
    });

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        const cookbook = {
            title: value.title,
            description: value.description,
            recipes: recipes
        }
        console.log(cookbook);

        const res = await fetch('/api/cookbook/add', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: value.title,
                description: value.description,
                recipes: recipes
            }),
        });
        const result = await res.json();
        console.log(result);
        router.push('/dashboard')
    }

    const addToBook = (event) => {
        event.preventDefault();
        setRecipes([...recipes, event.target.parentElement.id]);
    };

    if (status === 'loading') {
        return (
            <p>loading...</p>
        )
    };

    if (!session) {
        return (
            <div>
                <p>You are not logged in to an account. To create a recipe please log in or create an account.</p>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        )
    } else {

        return (
            <div class="bg-gray-900 h-screen text-gray-300 flex flex-row">
                <Nav />

                <div class="flex-1 flex flex-col items-center justify-center px-4 sm:px-0 mt-4">
                    <form class="w-full sm:w-1/2 mx-auto">
                        <h1 class="text-3xl font-bold mb-4">Create a Cookbook</h1>

                        <label class="block mb-4">
                            <span class="text-lg font-semibold">Cookbook name:</span>
                            <input type="text" name="title" class="block w-full bg-gray-800 border-gray-600 border-2 py-2 px-4 rounded-lg mt-2 text-gray-300" value={value.title} onChange={handleChange} />
                        </label>

                        <label class="block mb-4">
                            <span class="text-lg font-semibold">Description:</span>
                            <textarea name="description" class="block w-full bg-gray-800 border-gray-600 border-2 py-2 px-4 rounded-lg mt-2 text-gray-300" value={value.description} onChange={handleChange} />
                        </label>

                        <button class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 w-full sm:w-auto" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>

                <div class="flex-1 flex flex-wrap overflow-hidden mt-8 justify-center items-center">
                    <div class="h-full w-full sm:w-1/2 overflow-y-auto max-h-half-screen pr-4">
                        <h2 class="text-2xl font-bold mb-4">Recipes Added to Book</h2>

                        <ul class="list-disc pl-8">
                            {recipes.map((recipe) => (
                                <li key={recipe.id} class="mb-2">{recipe.title}</li>
                            ))}
                        </ul>
                    </div>

                    <div class="w-full sm:w-1/2 overflow-y-auto max-h-half-screen pl-4 mt-8 sm:mt-0">
                        <h2 class="text-2xl font-bold mb-4">My Recipes</h2>

                        {myRecipes && <RecipeList data={myRecipes} addToBook={addToBook} />}
                    </div>
                </div>

                <Footer />
            </div>



        )
    }
};

export default CookbookAdd;