import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import imgSrc from '../../public/images/book.jpg';
import Loading from '../components/loading';


const CookbookView = (props) => {
    const [recipes, setRecipes] = useState(null);
    const router = useRouter();
    const { cookbook, setActiveRecipe, setActiveComponent } = props;
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleClick = (recipe) => {
        setActiveRecipe(recipe);
        setActiveComponent('recipeView');
    };

    useEffect(() => {
        const fetchCookBookRecipes = async () => {
            const cookbookId = cookbook._id; // Replace with your actual cookbook ID
            const response = await fetch(`/api/recipe/getCookbookRecipes?cookbookId=${cookbookId}`);
            const data = await response.json();
            setRecipes(data);
        };

        fetchCookBookRecipes();
    }, []);

    if (!cookbook || !recipes) {
        return <Loading />;
    }

    return (
        <div className={`relative bg-gray-900 h-full md:mr-10 row-span-6 ${imageLoaded ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'
            }`}>
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-md">
                <Image
                    src={imgSrc}
                    alt="Background Image"
                    onLoadingComplete={handleImageLoad}
                    quality={100} // Adjust image quality if needed
                    className="object-cover object-center w-full h-full filter blur-md"
                />
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            <div className="relative container mx-auto px-4 py-6 z-10">
                <h1 className="text-4xl font-bold mb-4 md:mt-20 text-gray-800 text-center">{cookbook.title}</h1>
                <div className="grid grid-cols-1 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-40">
                    {recipes.map((recipe) => (
                        console.log(recipe),
                        <div
                            key={recipe.recipeId}
                            className="bg-gray-100 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer w-full"
                            onClick={() => handleClick(recipe)}
                        >
                            <div className="grid grid-cols-1 gap-4">
                                <div className='flex justify-between'>
                                    <h2 className="text-green-800 font-semibold mb-2">{recipe.title}</h2>
                                    <p className="text-green-800">{recipe.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CookbookView;