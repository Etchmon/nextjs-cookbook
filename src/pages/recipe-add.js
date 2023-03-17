import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';

const RecipeAdd = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    let id = 0;

    const [value, setValue] = useState({
        title: '',
        ingredients: '',
        instructions: ''
    });

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const addIngredient = (event) => {
        event.preventDefault();
        setIngredients([...ingredients, value.ingredients]);
        setValue({ ...value, ingredients: '' })
    }

    const addInstruction = (event) => {
        event.preventDefault();
        setInstructions([...instructions, value.instructions]);
        setValue({ ...value, instructions: '' })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const recipe = {
        //     title: value.title,
        //     ingredients: ingredients,
        //     instructions: instructions
        // };

        const res = await fetch('/api/recipe/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: value.title,
                ingredients: ingredients,
                instructions: instructions
            }),
        });
        const result = await res.json();
        console.log(result);
        router.push('/api/list')
    }

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
                    <h1>Create a Recipe</h1>
                    <label>
                        Recipe name:
                        <input type="text" name="title" value={value.title} onChange={handleChange} />
                    </label>
                    <label>
                        Ingredients
                        <input type="text" name="ingredients" value={value.ingredients} onChange={handleChange} />
                        <button onClick={addIngredient}>Add</button>
                    </label>
                    <label>
                        Instructions
                        <input type="text" name="instructions" value={value.instructions} onChange={handleChange} />
                        <button onClick={addInstruction}>Add</button>
                    </label>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
                <ol>
                    {ingredients.map(ingredients => (
                        <li key={id++}>{ingredients}</li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default RecipeAdd;