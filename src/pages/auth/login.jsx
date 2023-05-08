import React, { useEffect, useState } from "react";
import styles from '../../styles/Home.module.css';
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
        <main className={styles.loginContainer}>
            <section className={styles.login}>
                <h1 className={styles.heading1}>Login to Your Account</h1>
                <span className={styles.googleIcon} onClick={handleGoogleLogin}>&nbsp;</span>
                <div className={styles.lineContainer}>
                    <hr className={styles.line}/>
                    <p>OR</p>
                    <hr className={styles.line}/>
                </div>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className={styles.button1} onClick={handleLogin}>Enter</button>
            </section>
            <section className={styles.newUser}>
                <div className={styles.newUserImg}>&nbsp;</div>
                <h1 className={styles.heading1}>New User?</h1>
                <p className={styles.paragraph1}>Sign up to start building your own digital cookbook!</p>
                <Link href='/auth/signup' className={styles.button2}>Sign up</Link>
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
