import React from 'react';
import Link from 'next/link';
import { signOut, getSession, useSession } from "next-auth/react";

const Dashboard = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    const user = session.user;
    const recipes = user.cookbooks.allRecipes;
    const cookbooks = user.cookbooks.myBooks;
    console.log(session)
    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-gray-800 text-gray-300">
            {/* Sidebar */}
            <div className="bg-gray-900 w-full sm:w-1/4 sm:sticky sm:top-0">
                <h2 className="text-lg font-semibold p-4">Menu</h2>
                <ul className="p-4 space-y-2">
                    <li>
                        <Link href="/dashboard" className="block py-2 px-4 hover:bg-green-600 rounded">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/recipe-add" className="block py-2 px-4 hover:bg-green-600 rounded">
                            Recipes
                        </Link>
                    </li>
                    <li>
                        <Link href="/cookbook-add" className="block py-2 px-4 hover:bg-green-600 rounded">
                            CookBooks
                        </Link>
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
            <div className="bg-gray-100 p-8 rounded shadow flex-1">
                <h1 className="text-4xl font-bold mb-8">Welcome, {session.user.username}!</h1>
                <p className="text-xl mb-8">We hope you're having a great day.</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-100">
                        <h2 className="text-lg font-semibold mb-2">Recipes</h2>
                        <p className="text-green-800">Total: {recipes.length}</p>
                        <p className="text-green-800">New today: 20</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-100">
                        <h2 className="text-lg font-semibold mb-2">Cookbooks</h2>
                        <p className="text-green-800">Total: {cookbooks.length}</p>
                        <p className="text-green-800">New today: 10</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-100">
                        <h2 className="text-lg font-semibold mb-2">Total</h2>
                        <p className="text-green-800">Total: {(recipes.length + cookbooks.length)}</p>
                        <p className="text-green-800">New today: $200</p>
                    </div>
                    {/* Add more items as needed */}
                </div>
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
