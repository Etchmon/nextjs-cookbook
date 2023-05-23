import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import clientPromise from '../../lib/mongodb';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Loading from '../components/loading';
import Image from 'next/image';
import bgImage from '../../public/images/chef.jpg';
import { useRouter } from 'next/router';



export default function Home() {
  // State hook to keep track of the list of restaurants
  const [restaurants, setRestaurants] = useState([]);
  // Hook to access the Next.js session object
  const { data: session, status } = useSession();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };


  // Show loading indicator while the session is being checked
  if (status === 'loading') {
    return <Loading />
  }

  // Render the page
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>CookBook Digital</title>
        <meta name="description" content="Organize your recipes and plan your dinners with CookBook Digital." />
      </Head>
      <Navbar />

      <main className="bg-gray-800 text-gray-800 flex flex-grow">
        {!imageLoaded && <Loading />}
        <Image
          src={bgImage}
          alt="Background Image"
          onLoadingComplete={handleImageLoad}
          quality={100} // Adjust image quality if needed
          className="absolute inset-0 filter blur-md backdrop-filter backdrop-blur-lg backdrop-opacity-10 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <section className="flex flex-col items-center justify-center w-full z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className=" flex flex-col items-center justify-center text-white">
              <h1 className="text-5xl font-bold text-center mb-8 text-green-500">Organize your recipes and plan your dinners</h1>
              <p className="text-xl text-center mb-16">CookBook Digital is the only cookbook you'll ever need.</p>
              <Link href="/signup" className="bg-green-500 text-gray-800 py-2 px-4 rounded hover:bg-green-600">
                Get started
              </Link>
            </div>
          </div>
        </section>
        <Footer />
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

