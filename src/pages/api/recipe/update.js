// Imports
import clientPromise from '../../../../lib/mongodb';
import Recipe from '../../../../models/recipeModel';
import { getSession } from "next-auth/react";
import { ObjectId } from 'mongodb';

export default async function updateRecipe(req, res) {
    if (req.method !== 'PUT') {
        // Only allow PUT requests
        res.status('405').json({ message: 'Method Not Allowed' });
        return;
    }

    const session = await getSession({ req });
    if (!session) {
        res.status(401).json({ message: 'Not Authenticated' });
        return;
    }

    const { id, title, description, ingredients, instructions } = req.body

    try {
        const client = await clientPromise;
        const db = await client.db("CBD");
        const recipeCollection = await db.collection("Recipes");

        // Update the recipe in the database
        const result = await collection.updateOne(
            { _id: id },
            {
                $set: {
                    title,
                    description,
                    ingredients,
                    instructions,
                }
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }

}



