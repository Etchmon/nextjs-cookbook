import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import meatImage from '../../public/images/meat.jpg';
import nonMeatImage from '../../public/images/veg.jpg';

const RecipeCard = ({ recipe, showAddButton, updateData, setActiveComponent, setActiveRecipe }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userRecipes = session.user.cookbooks.allRecipes;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const meatIngredients = ['beef', 'chicken', 'pork', 'lamb']; // List of meat ingredients
    const hasMeatIngredients = recipe.ingredients.some((ingredient) =>
        meatIngredients.includes(ingredient.toLowerCase())
    );

    const imageSrc = hasMeatIngredients ? meatImage : nonMeatImage;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    // useEffect(() => {
    //     if (imageLoaded) {
    //         setTimeout(() => {
    //             setShowContent(true);
    //         }, 300); // Delay showing the content to allow the fade-in effect to work
    //     }
    // }, [imageLoaded]);

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
    const handleDelete = async (recipeId) => {
        console.log(recipeId)
        try {
            const response = await fetch('/api/recipe/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: recipeId,
                }),
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
                console.error('Failed to delete recipe:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }


        // Navigate to recipe view page
        alert('Recipe Deleted');
    };

    const handleClick = (recipe) => {
        setActiveRecipe(recipe);
        setActiveComponent('recipeView');
    };

    return (
        <div className={`relative lg:flex lg:justify-between items-center bg-gray-900 lg:m-10 shadow-md rounded-lg md:p-4 text-white ${imageLoaded ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'
            } `}>

            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-md">
                <Image
                    src={imageSrc}
                    alt="Background Image"
                    onLoadingComplete={handleImageLoad}
                    quality={100} // Adjust image quality if needed
                    className="object-cover object-center w-full h-full filter blur-lg"
                />
            </div>

            <div className='flex flex-col text-center lg:text-start lg:bg-gray-100 lg:p-10 rounded-md'>
                {/* Title */}
                <h2 className="text-2xl border-b border-gray-900 font-bold mt-4 mb-2 pb-4 text-b-600 z-10 text-gray-900">{recipe.title}</h2>

                {/* Description */}
                {recipe.description && <p className="text-gray-900 mb-4 z-10">{recipe.description}</p>}

                {/* Author */}
                <span className="font-italic text-gray-900 text-sm z-10">by {recipe.author}</span>
            </div>



            {/* Ingredients */}
            <div className="relative h-full w-full rounded-md pl-4 mt-4 z-10 overflow-y-scroll max-h-40 flex flex-col items-center text-center align-center justify-center">
                <h3 className="text-gray-900 text-lg font-semibold mb-2 sticky">Ingredients:</h3>
                <ul className="list-disc pl-6 text-gray-900 flex lg:flex-col justify-evenly items-center w-full flex-wrap">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index + 1}`}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            <div className="relative flex gap-2 mt-4 z-10 flex flex-col items-center text-center lg:items-start lg:text-start">
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-300 transition-colors duration-300"
                    onClick={() => handleClick(recipe)}
                >
                    View Recipe
                </button>
                {/* Delete Button */}
                {!showAddButton && (
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                        onClick={() => handleDelete(recipe._id)}
                    >
                        Delete
                    </button>
                )}
                {/* Add Button */}
                {showAddButton && (
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
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
