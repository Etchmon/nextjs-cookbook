import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
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

                    const userData = await collection.findOne({ email: credentials.email.toLowerCase() });
                    if (userData === null) {
                        return null;
                    }

                    if (credentials.password != userData.password) {
                        return null;
                    }


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
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const MongoClient = await clientPromise;
                const db = MongoClient.db('CBD');
                const collection = db.collection("Users");

                const userData = await collection.findOne({ email: user.email.toLowerCase() });
                if (userData === null) {
                    return false;
                }

                return true;
            } catch (e) {
                console.log(e);
            }
        },
        session: async (session) => {
            if (!session) return;

            try {
                const MongoClient = await clientPromise;
                const db = await MongoClient.db('CBD');
                const collection = await db.collection("Users");

                const userData = await collection.findOne({ email: session.session.user.email });
                if (userData === null) {
                    return {
                        newUser: {
                            email: session.session.user.email
                        }
                    }
                }

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
