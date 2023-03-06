import React, { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";

const signup = () => {
    const { data: session } = useSession();

    const [value, setValue] = useState({ value: '' })

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    const handleChange = (event) => {
        setValue({ value: event.target.value })
    }

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


    if (session) {
        console.log(session.user);
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
                        <input type="text" name="email" value={''} onChange={(event) => handleChange(event)} />
                    </label>
                    <label>
                        Username
                        <input type="text" name="username" value={''} onChange={(event) => handleChange(event)} />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={''} onChange={(event) => handleChange(event)} />
                    </label>
                    <label>
                        Confirm Password
                        <input type="password" name="passwordConfirm" value={''} onChange={(event) => handleChange(event)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default signup;