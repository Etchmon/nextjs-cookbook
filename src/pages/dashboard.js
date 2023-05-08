import React from 'react';
import Link from 'next/link';
import { signOut, getSession } from "next-auth/react";

function Dashboard() {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="bg-green-900 text-white w-full sm:w-1/4 sm:sticky sm:top-0">
                <h2 className="text-lg font-semibold p-4">Menu</h2>
                <ul className="p-4 space-y-2">
                    <li>
                        <Link href="/dashboard" className="block py-2 px-4 hover:bg-green-800 rounded">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="block py-2 px-4 hover:bg-green-800 rounded">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="/" onClick={() => signOut()} className="block py-2 px-4 hover:bg-green-800 rounded">
                            Sign Out
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Content */}
            <div className="bg-white p-4 rounded shadow flex-1">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="bg-green-200 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Users</h2>
                        <p className="text-green-800">Total: 1000</p>
                        <p className="text-green-800">New today: 20</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Orders</h2>
                        <p className="text-green-800">Total: 500</p>
                        <p className="text-green-800">New today: 10</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                        <p className="text-green-800">Total: $10000</p>
                        <p className="text-green-800">New today: $200</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Some other item</h2>
                        <p className="text-green-800">Total: 50</p>
                        <p className="text-green-800">New today: 5</p>
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

    // If no session is detected, redirect to the homepage
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
