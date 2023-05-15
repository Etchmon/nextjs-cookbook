import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const RecipeCard = ({ recipe }) => {
    const router = useRouter();

    const handleClick = (recipeId) => {
        router.push({
            pathname: '/recipe-view',
            query: { recipeId },
        });
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
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
            <h2 className="text-2xl font-bold mb-2 text-green-500 text-center">{recipe.title}</h2>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-center">{recipe.description}</p>

            {/* Ingredients */}
            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-green-500 text-lg font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc pl-6">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-100">{ingredient}</li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-300"
                onClick={() => handleClick(recipe._id)}
            >
                View Recipe
            </button>
        </div>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        description: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default RecipeCard;
