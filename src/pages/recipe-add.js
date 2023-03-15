import React, { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';

const RecipeAdd = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [value, setValue] = useState({
        title: '',
        ingredients: [],
        instructions: [],
        comments: []
    });

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    };

    if (status === 'loading') {
        return (
            <p>loading...</p>
        )
    };

    if (!session) {
        return (
            <div>
                <p>You are not logged in to an account. To create a recipe please log in or create an account.</p>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        )
    } else {

        return (
            <div>
                <form>
                    <h1>Create an account</h1>

                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default RecipeAdd;