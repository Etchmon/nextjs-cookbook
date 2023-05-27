import React from 'react';

const Footer = () => {
    return (
        <footer className="py-4 px-8 fixed bottom-0 w-full">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <p className="text-lg text-green-500">&copy; 2023 CookBook Digital. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;