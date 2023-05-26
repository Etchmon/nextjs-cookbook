import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CookbookView = (props) => {
    const [recipes, setRecipes] = useState(null);
    const router = useRouter();
    const { cookbook, setActiveRecipe, setActiveComponent } = props;


    const handleClick = (recipe) => {
        setActiveRecipe(recipe);
        setActiveComponent('recipeView');
    };

    console.log(cookbook);

    useEffect(() => {
        const fetchCookBookRecipes = async () => {
            const cookbookId = cookbook._id; // Replace with your actual cookbook ID
            const response = await fetch(`/api/recipe/getCookbookRecipes?cookbookId=${cookbookId}`);
            const data = await response.json();
            setRecipes(data);
        };

        fetchCookBookRecipes();
    }, []);

    if (!cookbook || !recipes) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-900 h-full md:mr-10 row-span-6">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold mb-4 md:mt-20 text-green-500">{cookbook.title}</h1>
                <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-40">
                    {recipes.map((recipe) => (
                        console.log(recipe),
                        <div
                            key={recipe.recipeId}
                            className="bg-gray-100 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer w-full"
                            onClick={() => handleClick(recipe)}
                        >
                            <div className="grid grid-cols-1 gap-4">
                                <div className='flex justify-between'>
                                    <h2 className="text-green-800 font-semibold mb-2">{recipe.title}</h2>
                                    <p className="text-green-800">{recipe.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CookbookView;