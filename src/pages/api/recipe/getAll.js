import clientPromise from '../../../../lib/mongodb';
import Recipe from '../../../../models/recipeModel'
import { getSession } from "next-auth/react";


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function myRecipes(req, res) {
    const session = await getSession({ req });

    if (req.method === 'GET') {
        // Process a GET request
        try {
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Recipes");
            const results = await collection.find({}).toArray();
            res.status(200).json(results);
        } catch (e) {
            console.log(e);
        }
    }
}