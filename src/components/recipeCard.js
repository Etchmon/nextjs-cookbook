import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const RecipeCard = ({ recipe, showAddButton, updateData }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userRecipes = session.user.cookbooks.allRecipes;

    const handleAdd = async (recipeId) => {
        if (userRecipes.includes(recipeId)) {
            alert('You already own this recipe');
            return;
        }
        try {
            const response = await fetch('/api/recipe/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle success response if needed

                // Trigger data update in Dashboard component
                if (updateData) {
                    updateData();
                }
            } else {
                // Handle error response if needed
                console.error('Failed to add recipe:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }


        // Navigate to recipe view page
        alert('Recipe Added');
    };

    const handleClick = (recipeId) => {
        router.push({
            pathname: '/recipe-view',
            query: { recipeId },
        });
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 m-10 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            {recipe.image && (
                <div className="aspect-w-3 aspect-h-2 mb-4">
                    <img
                        className="object-cover rounded-lg"
                        src={recipe.image}
                        alt={recipe.title}
                    />
                </div>
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2 text-green-600 text-center">{recipe.title}</h2>

            {/* Description */}
            {recipe.description && <p className="text-gray-600 mb-4 text-center">{recipe.description}</p>}

            {/* Author */}
            <span className='text-gray-400 text-sm'>{recipe.author}</span>

            {/* Ingredients */}
            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-gray-700 text-lg font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc pl-6">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index + 1}`} className="text-gray-700">{ingredient}</li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            <div className="flex gap-2">
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-300 transition-colors duration-300"
                    onClick={() => handleClick(recipe._id)}
                >
                    View Recipe
                </button>
                {/* Add Button */}
                {showAddButton && (
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition-colors duration-300"
                        onClick={() => handleAdd(recipe._id)}
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        description: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

RecipeCard.defaultProps = {
    showAddButton: true,
};

export default RecipeCard;
