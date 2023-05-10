import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-4 px-8 fixed bottom-0 w-full">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-lg text-green-500">&copy; 2023 CookBook Digital. All rights reserved.</p>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-green-500 hover:text-green-200">Privacy Policy</a>
                        <a href="#" className="text-green-500 hover:text-green-200">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;