import React from 'react';
import RecipeCard from './recipeCard';

const Stream = ({ recipes, showAddButton }) => {

    return (
        <div className="p-8 rounded shadow h-full">
            <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto scrollbar-hidden pb-80">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} showAddButton={showAddButton} />
                ))}
            </div>
        </div>
    );
};

export default Stream;