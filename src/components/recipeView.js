import React, { useEffect, useState } from 'react';
import Loading from '../components/loading';
import { useSession } from "next-auth/react";


const RecipeView = (recipeObj) => {

    const recipe = recipeObj.recipeObj;
    const { data: session, status } = useSession();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
    }, []);

    if (!session) {
        return <Loading />;
    };

    return (
        <div className={`h-full overflow-auto scrollbar-hidden grid gap-4 lg:grid-rows-6 lg:grid-cols-4 ${load ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'
            }`}>
            <h1 className="text-4xl font-bold lg:mb-4 lg:mt-10 text-green-500">
                {recipe.title}
                <span className='text-gray-400 text-sm ml-5'>by {recipe.author}</span>
            </h1>
            <div className="lg:flex-1 lg:flex-col bg-gray-50 p-4 rounded-[35px] shadow-lg lg:overflow-auto hide-scrollbar row-span-5 lg:col-start-1 lg:col-span-3">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 sticky">Instructions</h2>
                <ol className="list-decimal">
                    {recipe.instructions.map((instruction) => (
                        <li key={instruction} className="mb-2 ml-4 text-gray-800">
                            {instruction}
                        </li>
                    ))}
                </ol>
            </div>
            <div className="row-start-2 lg:col-start-4 lg:flex lg:flex-col p-4 rounded-[35px] shadow-lg bg-blue-100 row-span-5 ">
                <h2 className="text-2xl font-bold mb-2 text-blue-500 sticky">Ingredients</h2>
                <ul className="overflow-y-auto hide-scrollbar flex lg:flex-col justify-evenly content-center flex-wrap lg:content-start">
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
