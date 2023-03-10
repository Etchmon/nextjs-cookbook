import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../../lib/mongodb"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user.email);


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
                const db = MongoClient.db('CBD');
                const collection = db.collection("Users");

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
                        email: userData.email
                    }
                }
            } catch (e) {
                console.log(e);

            }
        }
    },
    secret: process.env.JWT_SECRET
}
export default NextAuth(authOptions)