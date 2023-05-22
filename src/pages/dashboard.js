import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, getSession, useSession } from "next-auth/react";
import Dash from '../components/dash';
import RecipeList from '../components/recipes';
import CookbooksList from '../components/cookbooks';
import Stream from '../components/stream';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [recipesFull, setRecipesFull] = useState([]);
    const [cookbooksFull, setCookbooksFull] = useState([]);
    const [streamRecipes, setStreamRecipes] = useState([]);

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

    useEffect(() => {
        // Fetch user data from API endpoints
        const fetchUserData = async () => {
            const [cookbookResponse, streamResponse] = await Promise.all([
                fetch('/api/cookbook/getUserCookbooks').then((res) => res.json()),
                fetch('/api/recipe/getAll').then((res) => res.json()),
            ]);

            // Set state with the fetched data
            setCookbooksFull(cookbookResponse);
            setStreamRecipes(shuffleArray(streamResponse));
        };

        // Fetch user data on component mount
        fetchUserData();
        fetchUserRecipes();
    }, []);



    console.log(recipesFull);

    // Render the appropriate component based on activeComponent state
    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <Stream recipes={streamRecipes} showAddButton={true} updateData={fetchUserRecipes} />;
            case 'recipes':
                return <RecipeList recipes={recipesFull} showAddButton={false} />;
            case 'cookbooks':
                return <CookbooksList cookbooks={cookbooksFull} />;
            default:
                return null;
        }
    };

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen bg-gray-900 text-gray-300">
            {/* Sidebar */}
            <div className="bg-gray-900 w-full sm:w-1/4 sm:sticky sm:top-0 flex-none">
                <h2 className="text-lg font-semibold p-4">Menu</h2>
                <ul className="p-4 space-y-2">
                    <li>
                        <button
                            className={`block py-2 px-4 hover:bg-green-600 rounded ${activeComponent === 'dashboard' ? 'bg-green-600' : ''}`}
                            onClick={() => setActiveComponent('dashboard')}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block py-2 px-4 hover:bg-green-600 rounded ${activeComponent === 'recipes' ? 'bg-green-600' : ''}`}
                            onClick={() => setActiveComponent('recipes')}
                        >
                            Recipes
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block py-2 px-4 hover:bg-green-600 rounded ${activeComponent === 'cookbooks' ? 'bg-green-600' : ''}`}
                            onClick={() => setActiveComponent('cookbooks')}
                        >
                            CookBooks
                        </button>
                    </li>
                    <li>
                        <Link href="/" className="block py-2 px-4 hover:bg-green-600 rounded">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="/" onClick={() => signOut()} className="block py-2 px-4 hover:bg-green-600 rounded">
                            Sign Out
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Content */}
            <div className="container px-4 py-6 flex1 overflow-hidden mb-2">
                <Dash session={session} recipes={recipesFull} cookbooks={cookbooksFull} />
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
