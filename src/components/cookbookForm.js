import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Loading from '../components/loading';

const CookbookForm = (props) => {
    const { data: session, status } = useSession();
    const { setActiveComponent, updateData } = props;

    const [recipes, setRecipes] = useState([]);
    const [myRecipes, setMyRecipes] = useState([]);

    const [load, setLoad] = useState(false);

    useEffect(() => {
        (async () => {
            const results = await fetch('/api/recipe/getUserRecipes');
            const resultsJson = await results.json();
            setMyRecipes(resultsJson);
            setLoad(true);
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
        updateData();
        setActiveComponent('cookbooks');
    }

    const addToBook = (event, recipe) => {
        event.preventDefault();
        if (recipes.includes(recipe)) {
            return;
        }
        setRecipes([...recipes, recipe]);
    };

    const removeFromBook = (event, recipe) => {
        event.preventDefault();
        const filteredArray = recipes.filter(item => item !== recipe)
        setRecipes([...filteredArray]);
    };

    if (!recipes) {
        return <Loading />;
    }

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
                <div className="flex-1 flex flex-col justify-center lg:justify-start items-center lg:items-start px-4 sm:px-0 mt-2 md:mt-10 w-full">
                    <form className="w-full">
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

                        <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-500 w-full" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>

                <div className="flex-1 flex flex-wrap grid grid-cols-2 mt-8 justify-center items-center">
                    <div className="h-full w-full overflow-y-auto pr-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Recipes</h2>
                        <ul className="inline-block max-width-content items-center">
                            {myRecipes.map(recipe => (
                                <li key={recipe._id} id={recipe._id} className='text-start mb-2 whitespace-nowrap'>
                                    <button className="p-1 mr-2 rounded-lg bg-red-800" onClick={(e) => addToBook(e, recipe)}>+</button>
                                    {recipe.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-full w-full overflow-y-auto pr-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Cookbook</h2>
                        <ul className="inline-block max-width-content items-center">
                            {recipes.map((recipe) => (
                                <li key={recipe._id} className="text-start mb-2 whitespace-nowrap">
                                    <button className="p-1 mr-2 rounded-lg bg-red-800" onClick={(e) => removeFromBook(e, recipe)}>-</button>
                                    {recipe.title}
                                </li>
                            ))}
                        </ul>
                        {errors.recipes && <p className="text-red-500">{errors.recipes}</p>}
                    </div>
                </div>
            </div>



        )
    }
};

export default CookbookForm;