import React from 'react';
import RecipeCard from './recipeCard';

const Stream = ({ recipes, showAddButton }) => {

    return (
        <div className="bg-gray-100 p-8 rounded shadow h-full  overflow-y-auto">
            <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full pb-80">
                {recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} showAddButton={showAddButton} />
                ))}
            </div>
        </div>
    );
};

export default Stream;