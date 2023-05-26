import React from 'react';


const RecipeView = (recipeObj) => {

    const recipe = recipeObj.recipeObj;

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-full grid lg-grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-4 sm:grid-cols-1">
            <h1 className="text-4xl font-bold lg:mb-4 lg:mt-10 text-green-500 col-span-1 lg:col-span-3">{recipe.title}
                <span className='text-gray-400 text-sm ml-5'>by: {recipe.author}</span>
            </h1>
            <div className="flex flex-col bg-gray-50 p-4 rounded-[35px] shadow-lg overflow-auto hide-scrollbar lg:col-span-2 row-span-4">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 sticky">Instructions</h2>
                <ol className="list-decimal">
                    {recipe.instructions.map((instruction) => (
                        <li key={instruction} className="mb-2 ml-4 text-gray-800">
                            {instruction}
                        </li>
                    ))}
                </ol>
            </div>
            <div className="flex-1 p-4 rounded-[35px] shadow-lg bg-blue-100 row-start-2 row-end-3 lg:col-start-3 lg:col-end-4">
                <h2 className="text-2xl font-bold mb-2 text-blue-500 sticky">Ingredients</h2>
                <ul className='overflow-hidden hide-scrollbar'>
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient} className="mb-2 text-blue-500">
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>
        </div>



    );
};

export default RecipeView;
