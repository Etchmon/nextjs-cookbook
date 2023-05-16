import Link from 'next/link';
import React from 'react'

const DashboardContent = ({ session, recipes, cookbooks }) => {
    return (
        <div className="p-8 rounded shadow flex-1 mb-2">
            <h1 className="text-4xl font-bold mb-8">Welcome, {session.user.username}!</h1>
            <p className="text-xl mb-8">We hope you're having a great day.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Link href="/recipe-add">
                    <div className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer">
                        <h2 className="text-green-800 font-semibold mb-2">Create Recipe</h2>
                        <p className="text-green-800">Total: {recipes.length}</p>
                    </div>
                </Link>
                <Link href="/cookbook-add">
                    <div className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer">
                        <h2 className="text-green-800 font-semibold mb-2">Create Cookbook</h2>
                        <p className="text-green-800">Total: {cookbooks.length}</p>
                    </div>
                </Link>
                {/* Add more items as needed */}
            </div>
        </div>
    );
};

export default DashboardContent;
