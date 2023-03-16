import clientPromise from '../../../../lib/mongodb';
import { getSession } from "next-auth/react";
import { ObjectId } from 'mongodb';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function oneRecipe(req, res) {
    const session = await getSession({ req });

    if (req.method === 'GET') {
        // Process a GET request
        try {
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Recipes");
            const results = await collection.find({ id: ObjectId(req.body.recipeId) });
            res.status(200).json(results);
        } catch (e) {
            console.log(e);
        }
    }
}