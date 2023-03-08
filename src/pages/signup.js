import React, { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";

const Signup = () => {
    const { data: session } = useSession();
    console.log(useSession())

    const [value, setValue] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const handleChange = (event) => {
        setValue({ [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.parentElement.username.value;
        const email = event.target.parentElement.email.value;
        const password = event.target.parentElement.password.value;
        const passwordConfirm = event.target.parentElement.passwordConfirm.value;
        if (password !== passwordConfirm) {
            alert("Password doesn't match Confirm Password");
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
        alert(`Username: ${result.user.username}`)
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
            <div>
                <form>
                    <h1>Create an account</h1>
                    <label>
                        Email
                        <input type="text" name="email" value={value.email} onChange={handleChange} />
                    </label>
                    <label>
                        Username
                        <input type="text" name="username" value={value.username} onChange={handleChange} />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={value.password} onChange={handleChange} />
                    </label>
                    <label>
                        Confirm Password
                        <input type="password" name="passwordConfirm" value={value.passwordConfirm} onChange={handleChange} />
                    </label>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;