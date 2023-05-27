import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from "../components/navbar";


const Login = () => {
    const [load, setLoad] = useState(false)

    // State for email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        setLoad(true);
    }, [])

    useEffect(() => {
        (async () => {
            const results = await fetch('/api/recipe/getUserRecipes');
            const resultsJson = await results.json();
            setMyRecipes(resultsJson);
        })();
    }, []);

    // Function to handle user login
    const handleLogin = () => {
        signIn('credentials', {
            email,
            password,
            callbackUrl: `${window.location.origin}/dashboard`
        });
    };

    const handleGoogleLogin = () => {
        signIn('google', {
            callbackUrl: `${window.location.origin}/dashboard`
        });
    };

    // Otherwise, display the login form
    return (
        <div className={`min-h-screen flex flex-col ${load ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'
                }`}>
            <Link href='/' className="fixed top-0 left-0 py-2 px-4 text-4xl text-white">
                &#8592;
            </Link>
            <main className="flex flex-1 flex-col md:flex-row items-center justify-center bg-gray-900">
             <section className="h-5/6 w-5/6 mt-20 bg-gray-800 p-8 rounded-lg shadow-md mx-auto mb-8 md:mb-0 md:mr-8 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold text-green-200 mb-6">Login to Your Account</h1>
                    <button
                        className="bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                     onClick={handleGoogleLogin}
                    >
                     Sign in with Google
                    </button>
                    <div className="flex items-center space-x-2 m-6">
                        <hr className="flex-1 border-green-400" />
                        <p className="text-green-200">OR</p>
                        <hr className="flex-1 border-green-400" />
                    </div>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border-2 border-green-400 rounded text-white bg-gray-900"
                        placeholder="Email"
                    />
                    <input
                        type='password'
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-6 border-2 border-green-400 rounded text-white bg-gray-900"
                        placeholder="Password"
                    />
                    <button
                        className="bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={handleLogin}
                    >
                        Enter
                    </button>
                </section>
                <section className="w-5/6 bg-gray-800 p-8 rounded-lg shadow-md mx-auto md:mb-0 md:mr-8 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold text-green-200 mb-2">New User?</h1>
                    <p className="text-green-200 mb-6">Sign up to start building your own digital cookbook!</p>
                    <Link href='/signup' className="bg-green-600 text-white font-bold py-2 px-4 rounded w-full text-center">
                        Sign up
                    </Link>
                </section>
            </main>
        </div>
    )
}

export default Login;

// Server-side function to get the current session
export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    
    // If the user is already logged in, redirect to the homepage
    if(session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    // Otherwise, return the session as props
    return {
        props: {...session}
    }
}
