import React from 'react';
import RecipeCard from './recipeCard';


const RecipeList = ({ recipes }) => {

    return (
        <div className="bg-gray-100 p-8 rounded shadow h-full">
            <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-80">
                {recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
