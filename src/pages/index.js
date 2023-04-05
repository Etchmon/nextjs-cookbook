import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import clientPromise from '../../lib/mongodb';
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from 'next/link';

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

  return (
    <div >
      <main className={styles.landing}>
        <nav className={styles.nav}>
          <span>CookBook Digital</span>
          {!session ? (
            <div className={styles.navButtons}>
              <Link href='/auth/login' style={{ textDecoration: 'none' }}>Log in</Link>
              <Link href='/auth/signup' style={{ textDecoration: 'none' }}>Sign up</Link>
            </div>

          ) : (
            <div className={styles.navButtons}>
              <a>{session.user.username}</a>
              <Link href='/' onClick={() => signOut()} style={{ textDecoration: 'none' }}>Sign out</Link>
            </div>

          )}

        </nav>
        <hero className={styles.hero}>
          <h1 className={styles.heading1}>Build your book</h1>
          <p className={styles.paragraph2}>The only cookbook you'll ever need.</p>
          <Link href='/auth/signup' className={styles.button1}>Get started</Link>
        </hero>
        <section className={styles.landingCard}>
          <div className={styles.landingCardSection}>
            <h2 className={styles.heading2}>Find new recipes, share your own!</h2>
            <p className={styles.paragraph2}>Browse the stream of user recipe's - add them to your cookbook with one click.</p>
            <button className={styles.button2}>Sign up</button>
          </div>
          <div className={styles.landingCardPic}>
            &nbsp;
          </div>
        </section>
        <section className={styles.hero2}>
          <h1 className={styles.heading1}>Level up your cooking game</h1>
          <p className={styles.paragraph2}>Organize your recipes to make personally curated cookbooks, plan your dinners, and become a powerful cook who can prepare a plethora of meals for yourself or guests.</p>
        </section>
        <footer>
          <p className={styles.paragraph2}>CookBook Digital</p>
        </footer>
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
