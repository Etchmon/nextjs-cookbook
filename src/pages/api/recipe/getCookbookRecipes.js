import clientPromise from '../../../../lib/mongodb';
import Cookbook from '../../../../models/cookbookModel';
import { getSession } from "next-auth/react";
import { ObjectID } from 'bson';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function cookbookRecipes(req, res) {
    if (req.method === 'GET') {
        try {
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Cookbooks");
            const recipeCollection = await db.collection("Recipes");

            const cookbookId = req.query.cookbookId;
            const cookbook = await collection.findOne({ _id: ObjectID(cookbookId) });

            const uniqueRecipeIds = [...new Set(cookbook.recipes)];
            const recipeIds = uniqueRecipeIds.map(ObjectID);

            const recipeQueries = recipeIds.map((recipeId) => (
                recipeCollection.findOne({ _id: recipeId })
            ));

            const recipes = await Promise.all(recipeQueries);

            res.status(200).json(recipes);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while retrieving recipes' });
        }
    }
}
