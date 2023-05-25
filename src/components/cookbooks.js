import React, { useState, useEffect } from 'react';
import { signOut, getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from 'next/link';

const CookbookList = (props) => {
    const router = useRouter();
    const { cookbooks, setActiveCookbook, setActiveComponent } = props;

    const handleView = (cookbook) => {
        setActiveCookbook(cookbook);
        setActiveComponent('cookbookView')

    };

    const handleEdit = (cookbook) => {
        setActiveCookbook(cookbook);
        setActiveComponent('cookbookEdit')
    };

    const handleDelete = async (cookbookId) => {
        const res = await fetch('/api/cookbook/delete', {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: cookbookId
            }),
        });

        const result = res.json();
        props.updateData();
    }

    return (
        <div className="p-8 rounded shadow h-full w-full overflow-y-auto">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-auto flex-1 h-full w-full pb-80">
                {cookbooks.map((cookbook) => (
                    <div
                        key={cookbook._id}
                        className="bg-gray-100 p-4 rounded-lg shadow flex flex-col"
                    >
                        <div className="grid grid-cols-1 gap-4 text-center">
                            <div>
                                <h2 className="text-green-800 font-semibold mb-2">{cookbook.title}</h2>
                                <p className="text-green-800">{cookbook.description}</p>
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-300"
                            onClick={() => handleView(cookbook)}
                        >
                            View
                        </button>
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition-colors duration-300"
                            onClick={() => handleEdit(cookbook)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition-colors duration-300"
                            onClick={() => handleDelete(cookbook._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CookbookList;