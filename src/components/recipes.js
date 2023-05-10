import React, { useState, useEffect } from 'react';
import { signOut, getSession, useSession } from "next-auth/react";

const RecipeList = ({ recipes }) => {
    console.log(recipes)

    return (
        <div className="bg-gray-100 p-8 rounded shadow h-full">
            <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-80">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-100">
                        <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                        <p className="text-green-800">{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>



    );
};

export default RecipeList;
