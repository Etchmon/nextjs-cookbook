import React, { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';

const Signup = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { username, email, password, passwordConfirm } = formValues;

        if (password !== passwordConfirm) {
            setErrorMessage("Password doesn't match Confirm Password");
            return;
        }
        const res = await fetch('/api/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
        });
        const result = await res.json();
        console.log(result);
        alert(`Username: ${result.user.username}`);
        router.push('/auth/login')
    }

    if (status === 'loading') {
        return (
            <p>loading...</p>
        )
    }

    if (session) {
        console.log(session);
        return (
            <div>
                <p>You are already signed in to an account. Sign out of your account before creating a new one</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    } else {

        return (
            <main className={styles.signupContainer}>
                <section className={styles.signup}>
                    <form className={styles.signupForm}>
                        <h1 className={styles.heading1}>Create an account</h1>
                        <label>
                            <input type="text" name="email" placeholder="Email" value={formValues.email} onChange={handleInputChange} />
                        </label>
                        <label>
                            <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleInputChange} />
                        </label>
                        <label>
                            <input type="password" name="password" placeholder="password" value={formValues.password} onChange={handleInputChange} />
                        </label>
                        <label>
                            <input type="password" name="passwordConfirm" placeholder="confirm password" value={formValues.passwordConfirm} onChange={handleInputChange} />
                        </label>
                        <button className={styles.button1} onClick={handleSubmit}>Submit</button>
                    </form>
                </section>
            </main>

        )
    }
}

export default Signup;
