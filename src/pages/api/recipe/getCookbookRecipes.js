import clientPromise from '../../../../lib/mongodb';
import Cookbook from '../../../../models/cookbookModel';
import { getSession } from "next-auth/react";
import { ObjectID } from 'bson';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function cookbookRecipes(req, res) {
    const session = await getSession({ req });

    if (req.method === 'GET') {
        // Process a GET request
        const recipes = [];
        try {
            // Access DB session and set collection variables
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Cookbooks");
            const recipeCollection = await db.collection("Recipes");
            const cookbook = await collection.findOne({ _id: ObjectID(req.body.cbId) });
            const cookbookRecipes = cookbook.recipes;

            for (const recipe of cookbookRecipes) {
                const result = await recipeCollection.findOne({ _id: ObjectID(recipe) });
                if (result === null) {
                    console.log('null');
                } else {
                    recipes.push(result);
                }

            };

            res.status(200).json(recipes);

        } catch (e) {
            console.log(e);
        };

    }
}