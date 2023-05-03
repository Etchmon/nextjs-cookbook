import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';

const Signup = () => {
    // Get session information using the useSession hook
    const { data: session, status } = useSession();
    const router = useRouter();

    // Define state for form values and error message
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [errorMessage, setErrorMessage] = useState('');

    // Function to update form values based on input changes
    const handleInputChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Destructure form values for easier use
        const { username, email, password, passwordConfirm } = formValues;

        // If password and confirm password don't match, show an error message
        if (password !== passwordConfirm) {
            setErrorMessage("Password doesn't match Confirm Password");
            return;
        }

        // Send POST request to add user using form values
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

        // Display username in an alert and redirect to login page
        alert(`Username: ${result.user.username}`);
        router.push('/auth/login')
    }

    // If session is still loading, show a loading message
    if (status === 'loading') {
        return (
            <p>loading...</p>
        )
    }

    // If user is already signed in, show a message and option to sign out
    if (session) {
        return (
            <div>
                <p>You are already signed in to an account. Sign out of your account before creating a new one</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    } else {
        // Otherwise, show the sign up form
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
