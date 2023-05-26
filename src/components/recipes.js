import React from 'react';
import RecipeCard from './recipeCard';


const RecipeList = ({ recipes, showAddButton, setActiveComponent, setActiveRecipe, updateData }) => {

    return (

        <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full w-full content-start grid-auto-rows overflow-y-auto scrollbar-hidden">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} showAddButton={showAddButton} setActiveComponent={setActiveComponent} setActiveRecipe={setActiveRecipe} updateData={updateData} />
            ))}
        </div>

    );
};

export default RecipeList;
