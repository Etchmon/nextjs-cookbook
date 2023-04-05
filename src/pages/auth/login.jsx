import React, { useEffect } from "react";
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Login = () => {
    const {data: session} = useSession();
    let {status: auth} = useSession();
    console.log(auth);

    if (session) {
        return (
            <div>
                <p>Welcome {session.user.username}</p>
                <button onClick={()=> signOut()}>Sign Out</button>
            </div>
        )
    }

    return (
        <main className={styles.loginContainer}>
            <section className={styles.login}>
                <h1 className={styles.heading1}>Login to Your Account</h1>
                <span className={styles.googleIcon}>&nbsp;</span>
                <div className={styles.lineContainer}>
                    <hr className={styles.line}/>
                    <p>OR</p>
                    <hr className={styles.line}/>
                </div>
                <input type="text" name="email"/>
                <input type='password' name="password"/>
                <button className={styles.button1}>Enter</button>
            </section>
            <section className={styles.newUser}>
                <div className={styles.newUserImg}>&nbsp;</div>
                <h1 className={styles.heading1}>New User?</h1>
                <p className={styles.paragraph1}>Sign up to start building your own digital cookbook!</p>
                <button className={styles.button2}>Sign up</button>
            </section>
        </main>
    )

}

export default Login;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    

    if(session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    return {
        props: {...session}
    }
}

