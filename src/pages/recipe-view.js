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
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold mb-4 text-green-500">{recipe.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2 text-green-500">Ingredients</h2>
                        <ul>
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient} className="mb-2 text-gray-500">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-2 text-green-500">Instructions</h2>
                        <ol>
                            {recipe.instructions.map((instruction) => (
                                <li key={instruction} className="mb-2 text-gray-300">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
