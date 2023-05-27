import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import imgSrc from '../../public/images/book.jpg';

const CookbookList = (props) => {
    const router = useRouter();
    const { cookbooks, setActiveCookbook, setActiveComponent } = props;
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

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
        <div className={`h-screen relative lg:flex lg:justify-between items-center bg-gray-900 lg:m-10 shadow-md rounded-lg pb-4 text-white ${imageLoaded ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'
            } `}>
            <div className="grid grid-cols-1 pb-4 lg:grid-cols-3 grid-auto-rows gap-4 flex-1 h-full w-full z-10">
                {cookbooks.map((cookbook) => (
                    <div
                        key={cookbook._id}
                        className="relative bg-gray-100 p-4 rounded-lg shadow flex flex-col justify-evenly"
                    >
                        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-md">
                            <Image
                                src={imgSrc}
                                alt="Background Image"
                                onLoadingComplete={handleImageLoad}
                                quality={100} // Adjust image quality if needed
                                className="object-cover object-center w-full h-full filter blur-md"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 text-center z-10">
                            <div>
                                <h2 className="text-4xl text-green-800 font-semibold mb-2">{cookbook.title}</h2>
                                <p className="text-green-800">{cookbook.description}</p>
                            </div>
                        </div>
                        <div className='flex justify-evenly gap-2 z-10'>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300"
                                onClick={() => handleView(cookbook)}
                            >
                                View
                            </button>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-300"
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CookbookList;