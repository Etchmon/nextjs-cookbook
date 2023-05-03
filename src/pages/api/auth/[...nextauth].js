import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";

// define the authentication options
const options = {
    providers: [
        // use Google OAuth provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // use custom email and password provider
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const MongoClient = await clientPromise;
                    const db = MongoClient.db('CBD');
                    const collection = db.collection("Users");

                    // find the user by email
                    const userData = await collection.findOne({ email: credentials.email.toLowerCase() });
                    if (userData === null) {
                        return null; // user not found, return null
                    }

                    // compare the password with the hashed password stored in the database
                    if (credentials.password != userData.password) {
                        return null; // password doesn't match, return null
                    }

                    // user found and password matched, return the user object
                    return {
                        id: userData._id,
                        email: userData.email,
                        username: userData.username,
                    };
                } catch (e) {
                    console.log(e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // run when the user signs in
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const MongoClient = await clientPromise;
                const db = MongoClient.db('CBD');
                const collection = db.collection("Users");

                // find the user by email
                const userData = await collection.findOne({ email: user.email.toLowerCase() });
                if (userData === null) {
                    return false; // user not found, return false
                }

                // user found, return true
                return true;
            } catch (e) {
                console.log(e);
            }
        },
        // run when the user's session is created
        session: async (session) => {
            if (!session) return;

            try {
                const MongoClient = await clientPromise;
                const db = await MongoClient.db('CBD');
                const collection = await db.collection("Users");

                // find the user by email
                const userData = await collection.findOne({ email: session.session.user.email });
                if (userData === null) {
                    // user not found, return a new user object with the email
                    return {
                        newUser: {
                            email: session.session.user.email
                        }
                    }
                }

                // user found, return the user object
                return {
                    user: {
                        id: userData._id,
                        username: userData.username,
                        password: userData.password,
                        email: userData.email,
                        cookbooks: userData.cookbooks
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    secret: process.env.JWT_SECRET
}

export default NextAuth(options);
