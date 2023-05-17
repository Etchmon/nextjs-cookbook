import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Nav from '../components/navbar';
import Footer from '../components/footer';

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

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        recipes: [],
    });


    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { title } = value;
        const { description } = value;

        // Perform input validation
        let validationErrors = {};
        let isValid = true;

        if (title.trim() === "") {
            validationErrors.title = "Title is required";
            isValid = false;
        } else if (title.trim().length < 3) {
            validationErrors.title = "Title must be at least 3 characters long";
            isValid = false;
        }

        if (title.trim() === "") {
            validationErrors.description = "Description is required";
            isValid = false;
        }

        if (recipes.length === 0) {
            validationErrors.recipes = "At least 1 recipe is required";
            isValid = false;
        }


        if (!isValid) {
            setErrors(validationErrors);
            return;
        }


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

    const addToBook = (event, recipe) => {
        console.log(recipe)
        event.preventDefault();
        setRecipes([...recipes, recipe]);
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
            <div className="bg-gray-900 h-screen text-gray-300 flex flex-col">
                <Nav />

                <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-0 mt-10">
                    <form className="w-full sm:w-1/2 mx-auto">
                        <h1 className="text-3xl font-bold mb-4">Create a Cookbook</h1>

                        <label className="block mb-4">
                            <span className="text-lg font-semibold">Cookbook name:</span>
                            <input type="text" name="title" className="block w-full bg-gray-800 border-gray-600 border-2 py-2 px-4 rounded-lg mt-2 text-gray-300" value={value.title} onChange={handleChange} />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}
                        </label>

                        <label className="block mb-4">
                            <span className="text-lg font-semibold">Description:</span>
                            <textarea name="description" className="block w-full bg-gray-800 border-gray-600 border-2 py-2 px-4 rounded-lg mt-2 text-gray-300" value={value.description} onChange={handleChange} />
                            {errors.description && <p className="text-red-500">{errors.description}</p>}
                        </label>

                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 w-full sm:w-auto" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>

                <div className="flex-1 flex flex-wrap grid grid-cols-2 mt-8 justify-center items-center">
                    <div className="h-full w-full overflow-y-auto pr-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
                        <ul className="pl-8 inline-block max-width-content items-center">
                            {myRecipes.map(recipe => (
                                <li key={recipe} id={recipe._id} className='text-start '>
                                    <button className="p-1 mr-2 rounded-lg bg-red-800" onClick={(e) => addToBook(e, recipe)}>+</button>
                                    {recipe.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-full w-full overflow-y-auto pr-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Recipes Added to Book</h2>

                        <ul className="pl-8 inline-block max-width-content items-center">
                            {recipes.map((recipe) => (
                                <li key={recipe._id} className="mb-2">{recipe.title}</li>

                            ))}
                        </ul>
                        {errors.recipes && <p className="text-red-500">{errors.recipes}</p>}
                    </div>
                </div>

                <Footer />
            </div>



        )
    }
};

export default CookbookAdd;