import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeId = router.query.recipeId; // Replace with your actual recipe ID
            const response = await fetch(`/api/recipe/getOne?recipeId=${recipeId}`);
            const data = await response.json();
            console.log(data[0])
            setRecipe(data[0]);
        };

        fetchRecipe();
    }, [router]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-900">
            <Navbar />
            <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
                <h1 className="text-4xl font-bold mb-4 mt-20 text-green-500">{recipe.title}</h1>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="col-span-4 bg-gray-800 p-4 rounded-md shadow-md overflow-auto hide-scrollbar">
                        <h2 className="text-2xl font-bold mb-2 text-green-500">Instructions</h2>
                        <ol>
                            {recipe.instructions.map((instruction) => (
                                <li key={instruction} className="mb-2 text-gray-300">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="col-span-2 bg-gray-800 p-4 rounded-md shadow-md overflow-auto hide-scrollbar">
                        <h2 className="text-2xl font-bold mb-2 text-green-500">Ingredients</h2>
                        <ul>
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient} className="mb-2 text-gray-300">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default RecipeDetail;
