import clientPromise from "../../../../lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectID } from "bson";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function myRecipes(req, res) {
    const session = await getSession({ req });

    if (req.method === "GET") {
        // Process a GET request


        try {
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Recipes");
            const userData = await db.collection("Users").findOne({ email: session.user.email })
            const userRecipes = userData.cookbooks.allRecipes;

            const promises = userRecipes.map((recipe) =>
                collection.findOne({ _id: ObjectID(recipe) })
            );

            const results = await Promise.all(promises);
            const myRecipes = results.filter((result) => result !== null);

            res.status(200).json(myRecipes);
        } catch (e) {
            console.log(e);
        }
    }
}
