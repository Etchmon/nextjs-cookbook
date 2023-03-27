import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';

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
            <div>
                <form>
                    <h1>Create a Coobook</h1>
                    <label>
                        Cookbook name:
                        <input type="text" name="title" value={value.title} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="textarea" name="description" value={value.description} onChange={handleChange} />
                    </label>

                    <button onClick={handleSubmit}>Submit</button>
                </form>
                <div className={styles.grid}>
                    {myRecipes && <RecipeList data={myRecipes} addToBook={addToBook} />}
                </div>
            </div>
        )
    }
};

export default CookbookAdd;