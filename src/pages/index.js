import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import clientPromise from '../../lib/mongodb';
import Navbar from '../components/navbar'
import Image from '../images/chef.jpg'

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
      <Navbar />
      <main className="bg-gray-800 text-gray-300 min-h-screen">
        <section className="h-screen">
          <div className="relative h-full">
            <img src="../images/chef.jpg" alt="Organize your recipes and plan your dinners with CookBook Digital" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h1 className="text-5xl font-bold text-center mb-8">Organize your recipes and plan your dinners</h1>
              <p className="text-xl text-center mb-16">CookBook Digital is the only cookbook you'll ever need.</p>
              <Link href="/signup" className="bg-green-500 text-gray-300 py-2 px-4 rounded hover:bg-green-600">
                Get started
              </Link>
            </div>
          </div>
        </section>
        <footer className="bg-gray-900 py-4 px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-green-500">&copy; 2023 CookBook Digital. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-green-500 hover:text-green-200">Privacy Policy</a>
              <a href="#" className="text-green-500 hover:text-green-200">Terms of Service</a>
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

