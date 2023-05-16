import React from 'react';
import RecipeCard from './recipeCard';


const RecipeList = ({ recipes, showAddButton }) => {

    return (
        <div className="p-8 rounded shadow h-full overflow-y-auto pb-80">
            <div className="grid grid-cols-1 grid-rows-1 gap-4 mb-auto flex-1 h-full">
                {recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} showAddButton={showAddButton} />
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
