import React from 'react';

function Dashboard() {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-full sm:w-1/4">
                <h2 className="text-lg font-semibold p-4">Menu</h2>
                <ul className="p-4">
                    <li className="mb-2"><a href="#" className="hover:text-gray-300">Dashboard</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-gray-300">Settings</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-gray-300">Profile</a></li>
                </ul>
            </div>
            {/* Content */}
            <div className="bg-white p-4 rounded shadow flex-1">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Users</h2>
                        <p className="text-gray-600">Total: 1000</p>
                        <p className="text-gray-600">New today: 20</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Orders</h2>
                        <p className="text-gray-600">Total: 500</p>
                        <p className="text-gray-600">New today: 10</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                        <p className="text-gray-600">Total: $10000</p>
                        <p className="text-gray-600">New today: $200</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Some other item</h2>
                        <p className="text-gray-600">Total: 50</p>
                        <p className="text-gray-600">New today: 5</p>
                    </div>
                    {/* Add more items as needed */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
