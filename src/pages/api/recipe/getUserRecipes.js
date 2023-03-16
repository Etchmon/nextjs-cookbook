import clientPromise from '../../../../lib/mongodb';
import Recipe from '../../../../models/recipeModel'
import { getSession } from "next-auth/react";
import { ObjectID } from 'bson';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function myRecipes(req, res) {
    const session = await getSession({ req });

    if (req.method === 'GET') {
        // Process a GET request
        const myRecipes = [];
        const sessionRecipes = session.user.cookbooks.allRecipes;

        try {

            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Recipes");

            for (const recipe of sessionRecipes) {
                const result = await collection.findOne({ _id: ObjectID(recipe) })
                myRecipes.push(result);
            };

            res.status(200).json(myRecipes);

        } catch (e) {
            console.log(e);
        };


    }
}