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
                <p>Login with Gmail</p>
                <span>Logo</span>
                <div>
                    <span>line</span>
                    <p>OR</p>
                    <span>line</span>
                </div>
                <input type="text" name="email"/>
                <input type='password' name="password"/>
            </section>
            <section className={styles.newUser}>
                <div className={styles.newUserImg}>&nbsp;</div>
                <h1 className={styles.heading1}>New User?</h1>
                <p>Sign up to start building your own digital cookbook!</p>
                <button>Sign up</button>
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

