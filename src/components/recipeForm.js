import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Loading from '../components/loading';

const RecipeForm = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { updateData, setActiveComponent } = props;

    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true);
    }, [])

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

    const removeInstruction = (event, instruction) => {
        event.preventDefault();
        const filteredArray = instructions.filter(item => item !== instruction);
        setInstructions([...filteredArray])
    }

    const removeIngredient = (event, ingredient) => {
        event.preventDefault();
        const filteredArray = ingredients.filter(item => item !== ingredient);
        setIngredients([...filteredArray])
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
                instructions: instructions,
                author: session.user.username
            }),
        });
        const result = await res.json();
        console.log(result);
        updateData();
        setActiveComponent('recipes');
    }

    if (status === 'loading') {
        return (
            <Loading />
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
            <div className={`bg-gray-900 h-full mx-auto text-gray-300 grid grid-cols-1 lg:mt-10 lg:grid-cols-2 ${load ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'
                }`}>
                <form className="flex flex-col w-full max-w-md p-4 items-start justify-center">
                    <h1 className="text-2xl font-bold w-full mb-4 text-center">Create a Recipe</h1>
                    <label className="w-full flex flex-col mb-4">
                        <span className="mb-2 font-medium">Recipe name:</span>
                        <input
                            className="w-full py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="text"
                            name="title"
                            value={value.title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="text-red-500">{errors.title}</span>}
                    </label>
                    <label className="w-full flex flex-col mb-4">
                        <span className="mb-2 font-medium">Description:</span>
                        <textarea name="description" className="w-full rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600" value={value.description} onChange={handleChange} />
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </label>
                    <label className="w-full flex flex-col mb-4">
                        <span className="mb-2 font-medium">Ingredients:</span>
                        <div className="flex flex-col md:flex w-full">
                            <input
                                className="py-2 px-3 rounded-t-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                type="text"
                                name="ingredients"
                                value={value.ingredients}
                                onChange={handleChange}
                            />
                            <button
                                className="py-2 px-4 rounded-b-md bg-blue-600 hover:bg-blue-700 text-gray-300 font-medium"
                                onClick={addIngredient}
                            >
                                Add
                            </button>
                        </div>
                        {errors.ingredients && <span className="text-red-500">{errors.ingredients}</span>}
                    </label>
                    <label className="w-full flex flex-col mb-4">
                        <span className="mb-2 font-medium">Instructions:</span>
                        <div className="flex flex-col md:flex">
                            <input
                                className="py-2 px-3 rounded-t-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                type="text"
                                name="instructions"
                                value={value.instructions}
                                onChange={handleChange}
                            />
                            <button
                                className="py-2 px-4 rounded-b-md bg-blue-600 hover:bg-blue-700 text-gray-300 font-medium"
                                onClick={addInstruction}
                            >
                                Add
                            </button>
                        </div>
                        {errors.instructions && <span className="text-red-500">{errors.instructions}</span>}
                    </label>
                    <button
                        className="w-full mt-10 py-6 px-4 rounded-md bg-green-600 hover:bg-green-700 text-gray-300 font-medium"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
                <div className="w-full max-h-screen grid gap-10 md:grid-rows-2 p-4 md:overflow-hidden">
                    <div className="w-full max-h-screen-1/2 overflow-y-scroll">
                        <h2 className="text-xl font-medium sticky top-0 bg-gray-900">Ingredients</h2>
                        <ol className="mt-4">
                            {ingredients.map((ingredient) => (
                                <li
                                    key={id++}
                                    className="py-2 px-3 mb-2 bg-gray-700 rounded-md text-gray-300 flex justify-between"
                                >
                                    {ingredient}
                                    <button className="p-1 mr-2 rounded-lg bg-red-800" onClick={(e) => removeIngredient(e, ingredient)}>-</button>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="w-full max-h-screen-1/2 overflow-y-scroll">
                        <h2 className="text-xl font-medium sticky top-0 bg-gray-900">Instructions</h2>
                        <ol className="list-decimal mt-4 flex flex-col">
                            {instructions.map((instruction) => (
                                <li
                                    key={id++}
                                    className="py-2 px-3 mb-2 bg-gray-700 rounded-md text-gray-300 flex flex-wrap justify-between"
                                >
                                    <p className="whitespace-pre-lines break-words max-w-[90%]">{instruction}</p>
                                    <button className="p-1 max-h-8 rounded-lg bg-red-800 flex-shrink-0" onClick={(e) => removeInstruction(e, instruction)}>-</button>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

        )
    }
}

export default RecipeForm;