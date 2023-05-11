import React, { useState, useEffect } from 'react';
import { signOut, getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from 'next/link';

const RecipeList = ({ recipes }) => {
    const router = useRouter();

    const handleClick = (recipeId) => {
        router.push({
            pathname: '/recipe-view',
            query: { recipeId: recipeId }
        })
    };

    return (
        <div className="bg-gray-100 p-8 rounded shadow h-full">
            <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-80">
                {recipes.map((recipe) => (
                    <div
                        key={recipe._id}
                        className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-100 cursor-pointer"
                        onClick={() => handleClick(recipe._id)}
                    >
                        <h2 className="text-green-800 font-semibold mb-2">{recipe.title}</h2>
                        <p className="text-green-800">{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
