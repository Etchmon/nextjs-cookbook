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
    // callbacks: {
    //     session: async (session) => {
    //         if(!session) return;

    //         const MongoClient = await clientPromise;
    //         const userCollection = MongoClient.db('CBD').collection('Users');

    //         const userData = await userCollection.findOne({
    //             email: session.user.email
    //         });

    //         return {
    //             session: {
    //                 user: {
    //                     id: userData._id,
    //                     username: userData.username,
    //                     password: userData.password,
    //                 }
    //             }
    //         }
    //     }
    // },
    secret: process.env.JWT_SECRET
}
export default NextAuth(authOptions)