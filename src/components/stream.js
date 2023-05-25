import React from 'react';
import RecipeCard from './recipeCard';

const Stream = ({ recipes, showAddButton, updateData, setActiveComponent, setActiveRecipe }) => {

    return (

        <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto scrollbar-hidden md:pb-80">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} showAddButton={showAddButton} updateData={updateData} setActiveComponent={setActiveComponent} setActiveRecipe={setActiveRecipe} />
            ))}
        </div>

    );
};

export default Stream;