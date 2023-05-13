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

    return (
        <div className="bg-gray-100 p-8 rounded shadow h-full">
            <div className="grid grid-cols-4 gap-4 mb-auto flex-1 h-full overflow-y-auto pb-80">
                {cookbooks.map((cookbook) => (
                    <div
                        key={cookbook._id}
                        className="bg-green-200 p-4 rounded-lg shadow hover:bg-green-300 cursor-pointer"
                        onClick={() => handleClick(cookbook._id)}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-green-800 font-semibold mb-2">{cookbook.title}</h2>
                                <p className="text-green-800">{cookbook.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CookbookList;