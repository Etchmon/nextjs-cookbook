import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const RecipeAdd = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    let id = 0;

    const [value, setValue] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: ''
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
    });

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const addIngredient = (event) => {
        event.preventDefault();
        let validationErrors = {};
        let isValid = true;
        if (value.ingredients.trim() === "") {
            validationErrors.ingredients = "Ingredient is required"
            isValid = false;
        };
        if (!isValid) {
            setErrors(validationErrors);
            return;
        };
        setIngredients([...ingredients, value.ingredients]);
        setValue({ ...value, ingredients: '' })
    }

    const addInstruction = (event) => {
        event.preventDefault();
        let validationErrors = {};
        let isValid = true;
        if (value.instructions.trim() === "") {
            validationErrors.instructions = "Instruction is required"
            isValid = false;
        };
        if (!isValid) {
            setErrors(validationErrors);
            return;
        };
        setInstructions([...instructions, value.instructions]);
        setValue({ ...value, instructions: '' })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Perform input validation
        let validationErrors = {};
        let isValid = true;

        if (value.title.trim() === "") {
            validationErrors.title = "Title is required";
            isValid = false;
        } else if (value.title.trim().length < 3) {
            validationErrors.title = "Title must be at least 3 characters long";
            isValid = false;
        }

        if (value.description.trim() === "") {
            validationErrors.description = "Description is required";
            isValid = false;
        } else if (value.description.trim().length < 3) {
            validationErrors.description = "Description must be at least 3 characters long";
            isValid = false;
        }

        if (ingredients.length === 0) {
            validationErrors.ingredients = "At least 1 ingredient is required";
            isValid = false;
        }

        if (instructions.length === 0) {
            validationErrors.instructions = "At least 1 instruction is required";
            isValid = false;
        }


        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        const res = await fetch('/api/recipe/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: value.title,
                description: value.description,
                ingredients: ingredients,
                instructions: instructions
            }),
        });
        const result = await res.json();
        console.log(result);
        router.push({
            pathname: '/recipe-view',
            query: { recipeId: result.recipe._id }
        })
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
            <div className="min-h-screen bg-gray-800 text-gray-300 flex flex-col items-center">
                <Navbar />
                <form className="flex flex-col w-full max-w-md p-4 items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Create a Recipe</h1>
                    <label className="flex flex-col mb-4">
                        <span className="mb-2 font-medium">Recipe name:</span>
                        <input
                            className="py-2 px-3 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="text"
                            name="title"
                            value={value.title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="text-red-500">{errors.title}</span>}
                    </label>
                    <label className="block mb-4">
                        <span className="mb-2 font-medium">Description:</span>
                        <textarea name="description" className="block w-full rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 px-10" value={value.description} onChange={handleChange} />
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </label>
                    <label className="flex flex-col mb-4">
                        <span className="mb-2 font-medium">Ingredients:</span>
                        <div className="flex">
                            <input
                                className="py-2 px-3 rounded-l-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                type="text"
                                name="ingredients"
                                value={value.ingredients}
                                onChange={handleChange}
                            />
                            <button
                                className="py-2 px-4 rounded-r-md bg-green-600 hover:bg-green-700 text-gray-300 font-medium"
                                onClick={addIngredient}
                            >
                                Add
                            </button>
                        </div>
                        {errors.ingredients && <span className="text-red-500">{errors.ingredients}</span>}
                    </label>
                    <label className="flex flex-col mb-4">
                        <span className="mb-2 font-medium">Instructions:</span>
                        <div className="flex">
                            <input
                                className="py-2 px-3 rounded-l-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                type="text"
                                name="instructions"
                                value={value.instructions}
                                onChange={handleChange}
                            />
                            <button
                                className="py-2 px-4 rounded-r-md bg-green-600 hover:bg-green-700 text-gray-300 font-medium"
                                onClick={addInstruction}
                            >
                                Add
                            </button>
                        </div>
                        {errors.instructions && <span className="text-red-500">{errors.instructions}</span>}
                    </label>
                    <button
                        className="py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 text-gray-300 font-medium"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
                <div className="grid gap-10 md:grid-cols-2 sm:grid-cols-1 p-6">
                    <div className="max-w-md">
                        <h2 className="text-xl font-medium mb-2">Ingredients</h2>
                        <ol className="mt-4">
                            {ingredients.map((ingredient) => (
                                <li
                                    key={id++}
                                    className="py-2 px-3 mb-2 bg-gray-700 rounded-md text-gray-300"
                                >
                                    {ingredient}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="max-w-md">
                        <h2 className="text-xl font-medium mb-2">Instructions</h2>
                        <ol className="list-decimal mt-4">
                            {instructions.map((instruction) => (
                                <li
                                    key={id++}
                                    className="py-2 px-3 mb-2 bg-gray-700 rounded-md text-gray-300"
                                >
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

        )
    }
}

export default RecipeAdd;