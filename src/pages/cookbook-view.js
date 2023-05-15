import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const CookbookDetail = () => {
    const [cookbook, setCookbook] = useState(null);
    const [recipes, setRecipes] = useState(null);
    const router = useRouter();

    const handleClick = (recipeId) => {
        router.push({
            pathname: '/recipe-view',
            query: { recipeId: recipeId }
        })
    };

    useEffect(() => {
        const fetchCookBook = async () => {
            const cookbookId = router.query.cookbookId; // Replace with your actual cookbook ID
            const response = await fetch(`/api/cookbook/getOne?cookbookId=${cookbookId}`);
            const data = await response.json();
            setCookbook(data[0]);
        };

        fetchCookBook();
    }, [router]);

    useEffect(() => {
        const fetchCookBookRecipes = async () => {
            const cookbookId = router.query.cookbookId; // Replace with your actual cookbook ID
            const response = await fetch(`/api/recipe/getCookbookRecipes?cookbookId=${cookbookId}`);
            const data = await response.json();
            setRecipes(data);
        };

        fetchCookBookRecipes();
    }, [router]);

    if (!cookbook || !recipes) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold mb-4 mt-20 text-green-500">{cookbook.title}</h1>
                <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-80">
                    {recipes.map((recipe) => (
                        console.log(recipe),
                        <div
                            key={recipe.recipeId}
                            className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer"
                            onClick={() => handleClick(recipe._id)}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h2 className="text-green-800 font-semibold mb-2">{recipe.title}</h2>
                                    <p className="text-green-800">{recipe.description}</p>
                                </div>
                                <div>
                                    <h3 className="text-green-800 font-semibold mb-2">Ingredients:</h3>
                                    <ul className="list-disc pl-6">
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index} className="text-green-800">{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CookbookDetail;