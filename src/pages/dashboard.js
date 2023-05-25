import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { signOut, getSession, useSession } from "next-auth/react";
import Dash from '../components/dash';
import RecipeList from '../components/recipes';
import CookbooksList from '../components/cookbooks';
import Stream from '../components/stream';
import RecipeForm from '../components/recipeForm';
import CookbookForm from '../components/cookbookForm';
import RecipeView from '../components/recipeView';
import CookbookView from '../components/cookbookView'
import CookbookEdit from '../components/cookbookEdit';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [recipesFull, setRecipesFull] = useState([]);
    const [cookbooksFull, setCookbooksFull] = useState([]);
    const [streamRecipes, setStreamRecipes] = useState([]);
    const [activeRecipe, setActiveRecipe] = useState(null);
    const [activeCookbook, setActiveCookbook] = useState(null);

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fetch user recipes
    const fetchUserRecipes = async () => {
        const response = await fetch('/api/recipe/getUserRecipes');
        const data = await response.json();
        setRecipesFull(data);
    };

    // Fetch user recipes
    const fetchUserCookbooks = async () => {
        const response = await fetch('/api/cookbook/getUserCookbooks');
        const data = await response.json();
        setCookbooksFull(data);
    };


    useEffect(() => {
        // Fetch user data from API endpoints
        const fetchUserData = async () => {
            const [streamResponse] = await Promise.all([
                fetch('/api/recipe/getAll').then((res) => res.json()),
            ]);

            // Set state with the fetched data
            setStreamRecipes(shuffleArray(streamResponse));
        };

        // Fetch user data on component mount
        fetchUserData();
        fetchUserRecipes();
        fetchUserCookbooks();
    }, []);

    // Render the appropriate component based on activeComponent state
    const renderComponent = () => {
        switch (activeComponent) {
            case 'recipeView':
                return <RecipeView recipeObj={activeRecipe} />
            case 'cookbookView':
                return <CookbookView cookbook={activeCookbook} setActiveComponent={setActiveComponent} setActiveRecipe={setActiveRecipe} />
            case 'cookbookEdit':
                return <CookbookEdit cookbook={activeCookbook} myRecipes={recipesFull} />
            case 'recipeAdd':
                return <RecipeForm />
            case 'cookbookAdd':
                return <CookbookForm setActiveComponent={setActiveComponent} updateData={fetchUserCookbooks} />
            case 'dashboard':
                return <Dash session={session} recipes={recipesFull} cookbooks={cookbooksFull} onClick={setActiveComponent} />;
            case 'stream':
                return <Stream recipes={streamRecipes} showAddButton={true} updateData={fetchUserRecipes} setActiveComponent={setActiveComponent} setActiveRecipe={setActiveRecipe} />;
            case 'recipes':
                return <RecipeList recipes={recipesFull} showAddButton={false} setActiveComponent={setActiveComponent} setActiveRecipe={setActiveRecipe} />;
            case 'cookbooks':
                return <CookbooksList cookbooks={cookbooksFull} updateData={fetchUserCookbooks} setActiveCookbook={setActiveCookbook} setActiveComponent={setActiveComponent} />;
            default:
                return null;
        }
    }

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 h-screen w-full bg-gray-900 text-gray-300">
            <Head>
                <title>CBD</title>
                <meta name="description" content="Organize your recipes and plan your dinners with CookBook Digital." />
            </Head>
            {/* Sidebar */}
            <div className="bg-gray-900 sm:top-0">
                <h2 className="text-lg text-green-500 font-semibold pt-4 md:p-4 text-center md:text-left">Menu</h2>
                <ul className="mt-2 md:p-4 space-y-2 flex flex-wrap justify-evenly md:flex-col lg:flex-col">
                    <li>
                        <button
                            className={`text-green-300 block py-2 px-4 mt-2 md:mt-0 hover:bg-green-600 hover:text-gray-100 rounded md:w-3/4 text-left ${activeComponent === 'dashboard' ? 'bg-green-600 text-gray-100' : ''}`}
                            onClick={() => setActiveComponent('dashboard')}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            className={`text-green-300 block py-2 px-4 hover:bg-green-600 hover:text-gray-100 rounded md:w-3/4 text-left ${activeComponent === 'stream' ? 'bg-green-600 text-gray-100' : ''}`}
                            onClick={() => setActiveComponent('stream')}
                        >
                            Stream
                        </button>
                    </li>
                    <li>
                        <button
                            className={`text-green-300 block py-2 px-4 hover:bg-green-600 hover:text-gray-100 rounded md:w-3/4 text-left ${activeComponent === 'recipes' ? 'bg-green-600 text-gray-100' : ''}`}
                            onClick={() => setActiveComponent('recipes')}
                        >
                            Recipes
                        </button>
                    </li>
                    <li>
                        <button
                            className={`text-green-300 block py-2 px-4 hover:bg-green-600 hover:text-gray-100 rounded md:w-3/4 text-left ${activeComponent === 'cookbooks' ? 'bg-green-600 text-gray-100' : ''}`}
                            onClick={() => setActiveComponent('cookbooks')}
                        >
                            CookBooks
                        </button>
                    </li>
                    <li>
                        <Link href="/" onClick={() => signOut()} className="text-green-300 block py-2 px-4 hover:bg-green-600 hover:text-gray-100 rounded md:w-3/4">
                            Sign Out
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Content */}
            <div className="h-full col-span-3 container px-4 py-6 overflow-y-scroll md:overflow-hidden mb-2">
                {renderComponent()}
            </div>
        </div>



    );
}

export default Dashboard;

// Server-side function to get the current session
export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    // If no session is, redirect to the homepage
    if (!session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    // Otherwise, return the session as props
    return {
        props: { ...session }
    }
}
