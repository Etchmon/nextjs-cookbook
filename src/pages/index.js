import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import clientPromise from '../../lib/mongodb';

export default function Home() {
  // State hook to keep track of the list of restaurants
  const [restaurants, setRestaurants] = useState([]);
  // Hook to access the Next.js session object
  const { data: session, status } = useSession();

  // Fetch the list of restaurants from the server
  useEffect(() => {
    async function fetchRestaurants() {
      const results = await fetch("/api/list");
      const resultsJson = await results.json();
      setRestaurants(resultsJson);
    }

    fetchRestaurants();
  }, []);

  // Show loading indicator while the session is being checked
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Render the page
  return (
    <div>
      <Head>
        <title>CookBook Digital</title>
        <meta name="description" content="Organize your recipes and plan your dinners with CookBook Digital." />
      </Head>
      <main className="bg-green-900 text-white min-h-screen">
        <nav className="bg-green-800 shadow-sm py-4 px-8 flex justify-between items-center">
          <span className="text-xl font-bold">CookBook Digital</span>
          {!session ? (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-green-400 hover:text-green-300">
                Log in
              </Link>
              <Link href="/auth/signup" className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <a className="text-green-400 hover:text-green-300">{session.user.username}</a>
              <Link href="/" className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500" onClick={() => signOut()}>
                Sign out
              </Link>
            </div>
          )}
        </nav>
        <section className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold text-center mb-8">Build your book</h1>
          <p className="text-xl text-green-400 text-center mb-16">The only cookbook you&apos;ll ever need.</p>
          <Link href="/auth/signup" className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500">
            Get started
          </Link>
        </section>
        <section className="flex flex-col items-center justify-center h-screen bg-green-800 text-white">
          <h1 className="text-5xl font-bold text-center mb-8">Welcome to CookBook Digital</h1>
          <p className="text-xl text-center mb-16">Organize your recipes, plan your dinners, and become a master chef.</p>
        </section>
        <section className="bg-white shadow-lg flex flex-col md:flex-row justify-center items-center py-16">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Discover and share new recipes</h2>
            <p className="text-xl text-center mb-8">Browse a stream of user recipes, add them to your cookbook, and share your own creations with the community.</p>
          </div>
          <div className="md:w-1/2 p-8">
            <img src="/images/chef.jpg" alt="Recipe stream" className="h-auto w-full" />
          </div>
        </section>
        <section className="bg-green-800 py-16 text-white">
          <div className="max-w-5xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-center mb-8">Curate your own cookbook</h2>
            <p className="text-xl text-center mb-8">Organize your recipes into custom cookbooks, plan your meals for the week, and become a powerful cook who can prepare a plethora of meals for yourself or guests.</p>
            <Link href="/auth/signup" className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 flex justify-center">
              Sign up
            </Link>
          </div>
        </section>
        <footer className="bg-green-800 py-4 px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-green-400">&copy; 2023 CookBook Digital. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-green-400 hover:text-green-300">Privacy Policy</a>
              <a href="#" className="text-green-400 hover:text-green-300">Terms of Service</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// Get server-side props to check the connection to MongoDB
export async function getServerSideProps(context) {
  try {
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.log(e)
    return {
      props: { isConnected: false },
    }
  }
}
