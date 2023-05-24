import Link from 'next/link';
import React from 'react'

const DashboardContent = ({ session, recipes, cookbooks, onClick }) => {
    return (
        <div className="p-8 rounded shadow flex-1 mb-2 text-green-300">
            <h1 className="text-4xl font-bold mb-8">Welcome, {session.user.username}!</h1>
            <p className="text-xl mb-8">We hope you&#39;re having a great day.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-gray-900">
                <button className="bg-green-500 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer" onClick={() => onClick('recipeAdd')}>
                    <h2 className="font-semibold mb-2">Create Recipe</h2>
                    <p>Total: {recipes.length}</p>
                </button>
                <button className="bg-green-500 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer" onClick={() => onClick('cookbookAdd')}>
                    <h2 className="font-semibold mb-2">Create Cookbook</h2>
                    <p>Total: {cookbooks.length}</p>
                </button>
                {/* Add more items as needed */}
            </div>
        </div>
    );
};

export default DashboardContent;
