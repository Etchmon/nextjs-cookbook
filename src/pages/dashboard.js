import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, getSession, useSession } from "next-auth/react";
import Dash from '../components/dash';
import RecipeList from '../components/recipes';
import Footer from '../components/footer';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [recipesFull, setRecipesFull] = useState([]);

    useEffect(() => {
        async function fetchFullRecipes() {
            const results = await fetch('/api/recipe/getUserRecipes');
            const resultsJson = await results.json();
            setRecipesFull(resultsJson);
            console.log(resultsJson);
        }

        fetchFullRecipes();
    }, []);


    if (!session) {
        return <div>Loading...</div>;
    }



    const user = session.user;
    const recipes = user.cookbooks.allRecipes;
    const cookbooks = user.cookbooks.myBooks;
    console.log(session)

    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return;
            case 'recipes':
                return <RecipeList recipes={recipesFull} />;
            case 'cookbooks':
                return <RecipeAdd />;
            default:
                return null;
        }
    };



    return (
        <div className="flex flex-col sm:flex-row h-screen bg-gray-800 text-gray-300">
            {/* Sidebar */}
            <div className="bg-gray-900 w-full sm:w-1/4 sm:sticky sm:top-0 flex-none">
                <h2 className="text-lg font-semibold p-4">Menu</h2>
                <ul className="p-4 space-y-2">
                    <li>
                        <button
                            className={`block py-2 px-4 hover:bg-green-600 rounded ${activeComponent === 'dashboard' ? 'bg-green-600' : ''
                                }`}
                            onClick={() => setActiveComponent('dashboard')}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block py-2 px-4 hover:bg-green-600 rounded ${activeComponent === 'recipes' ? 'bg-green-600' : ''
                                }`}
                            onClick={() => setActiveComponent('recipes')}
                        >
                            Recipes
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block py-2 px-4 hover:bg-green-600 rounded ${activeComponent === 'cookbookAdd' ? 'bg-green-600' : ''
                                }`}
                            onClick={() => setActiveComponent('cookbookAdd')}
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
                <Dash session={session} recipes={recipes} cookbooks={cookbooks} />
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
