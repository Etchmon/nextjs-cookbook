import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from "../components/navbar";

const Signup = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        const { email, username, password } = formData;
        const errors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Username validation
        if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        }
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            errors.username = 'Username should only contain letters and numbers';
        }

        // Password validation
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if there are no errors
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const { username, email, password, passwordConfirm } = formData;
        if (password !== passwordConfirm) {
            alert("Password doesn't match Confirm Password");
            return;
        }

        const res = await fetch('/api/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const result = await res.json();
        if (result.email) {
            alert('That email is already in use')
            return;
        }
        if (result.username) {
            alert('That username is already in use')
            return;
        }

        alert(`Username: ${result.user.username}`);
        router.push('/login');
    };

    if (status === 'loading') {
        return (
            <p>loading...</p>
        );
    }

    if (session) {
        return (
            <div className="flex flex-col items-center justify-center">
                <p className="mb-4 text-lg text-gray-400">You are already signed in to an account. Sign out of your account before creating a new one</p>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col h-screen bg-gray-900">
                <Navbar />
                <main className="flex items-center justify-center h-screen bg-gray-900">
                    <section className="bg-green-500 p-8 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold mb-4 text-gray-900">Create an account</h1>
                        <form className="flex flex-col space-y-4">
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 rounded-lg py-2 px-4 text-gray-900"
                                />
                                {errors.email && <span className="text-red-500">{errors.email}</span>}
                            </label>
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 rounded-lg py-2 px-4 text-gray-900"
                                />
                                {errors.username && <span className="text-red-500">{errors.username}</span>}
                            </label>
                            <label className="flex flex-col">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 rounded-lg py-2 px-4 text-gray-900"
                                />
                                {errors.password && <span className="text-red-500">{errors.password}</span>}
                            </label>
                            <label className="flex flex-col">
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="Confirm Password"
                                    value={formData.passwordConfirm}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 rounded-lg py-2 px-4 text-gray-900"
                                />
                                {errors.passwordConfirm && <span className="text-red-500">{errors.passwordConfirm}</span>}
                            </label>
                            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
                        </form>
                    </section>
                </main>
            </div>

        );
    }
};

export default Signup;
