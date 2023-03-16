import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';

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
                        <input type="textarea" name="ingredients" value={value.ingredients} onChange={handleChange} />
                    </label>
                    <button>Add Recipes</button>
                    <button>Submit</button>
                </form>
                <div className={styles.grid}>
                    {myRecipes.map(recipe => (
                        <li key={recipe.id}>{recipe.title}</li>
                    ))}
                </div>
            </div>
        )
    }
};

export default CookbookAdd;