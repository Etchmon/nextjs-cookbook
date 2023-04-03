import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import clientPromise from '../../lib/mongodb';
import { useSession, signIn, signOut, getSession } from "next-auth/react";

/* eslint react/no-string-refs: 0 */

export default function Home({ isConnected }) {

  const [restaurants, setRestaurants] = useState([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      const results = await fetch("/api/list");
      const resultsJson = await results.json();
      setRestaurants(resultsJson);
    })();
  }, []);



  if (status === 'loading') {
    return (
      <p>loading...</p>
    )
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <link ref='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.landing}>
          <nav className={styles.nav}>
            <span>CookBook Digital</span>
            <div className={styles.navButtons}>
              <a>Log in</a>
              <a>Sign up</a>
            </div>
          </nav>
          <hero className={styles.hero}>
            <h1 className={styles.heading1}>Build your book</h1>
            <p className={styles.paragraph2}>The only cookbook you'll ever need.</p>
            <button className={styles.button1}>Get started</button>
          </hero>
          <div className={styles.landingCard}>
            <div className={styles.landingCardSection}>
              <h2 className={styles.heading2}>Find new recipes, share your own!</h2>
              <p className={styles.paragraph2}>Browse the stream of user recipe's - add them to your cookbook with one click!</p>
              <button>Sign up</button>
            </div>
            <div className={styles.landingCardPic}>
              &nbsp;
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link ref='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <button onClick={() => signOut()}>Sign Out</button>
        <h1 className={styles.title}>Welcome, {session.user.username}</h1>
        <br />
        <div className={styles.grid}>
        </div>
      </main>
    </div>
  )
}

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
