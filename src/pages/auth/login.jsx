import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Login = () => {
    // Get the current session and authentication status
    const { data: session } = useSession();
    let { status: auth } = useSession();
    console.log(auth);

    // State for email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-green-900 px-4">
            <section className="bg-green-200 p-8 rounded-lg shadow-md mb-8 md:mb-0 md:mr-8">
                <h1 className="text-2xl font-bold text-green-800 mb-6 flex justify-center">Login to Your Account</h1>
                <button
                    className="flex items-center justify-center space-x-2 bg-green-800 text-white font-bold py-2 px-4 rounded mb-6"
                    onClick={handleGoogleLogin}
                >
                    <span>Sign in with Google</span>
                </button>
                <div className="flex items-center space-x-2 mb-6">
                    <hr className="flex-1 border-green-400" />
                    <p>OR</p>
                    <hr className="flex-1 border-green-400" />
                </div>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border-2 border-green-400 rounded"
                    placeholder="Email"
                />
                <input
                    type='password'
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-6 border-2 border-green-400 rounded"
                    placeholder="Password"
                />
                <button
                    className="bg-green-800 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={handleLogin}
                >
                    Enter
                </button>
            </section>
            <section className="text-center">
                <div className="bg-green-800 w-24 h-24 mx-auto mb-4 rounded-full">&nbsp;</div>
                <h1 className="text-2xl font-bold text-green-200 mb-2">New User?</h1>
                <p className="text-green-200 mb-6">Sign up to start building your own digital cookbook!</p>
                <Link href='/auth/signup' className="bg-green-800 text-white font-bold py-2 px-4 rounded">
                    Sign up
                </Link>
            </section>
        </main>
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
