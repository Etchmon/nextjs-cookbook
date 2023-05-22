import React, { useState, useEffect } from 'react';
import { signOut, getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from 'next/link';

const CookbookList = ({ cookbooks }) => {
    const router = useRouter();

    const handleClick = (cookbookId) => {
        router.push({
            pathname: '/cookbook-view',
            query: { cookbookId: cookbookId }
        })
    };

    const handleEdit = (cookbookId) => {
        router.push({
            pathname: '/cookbook-edit',
            query: { cookbookId: cookbookId }
        })
    };

    return (
        <div className="p-8 rounded shadow h-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-80">
                {cookbooks.map((cookbook) => (
                    <div
                        key={cookbook._id}
                        className="bg-gray-100 p-4 rounded-lg shadow"
                    >
                        <div className="grid grid-cols-1 gap-4 text-center">
                            <div>
                                <h2 className="text-green-800 font-semibold mb-2">{cookbook.title}</h2>
                                <p className="text-green-800">{cookbook.description}</p>
                            </div>
                        </div>
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-300"
                            onClick={() => handleClick(cookbook._id)}
                        >
                            View
                        </button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition-colors duration-300"
                            onClick={() => handleEdit(cookbook._id)}
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CookbookList;