import clientPromise from '../../../../lib/mongodb';
import { getSession } from "next-auth/react";
import { ObjectId } from 'mongodb';

export default async function updateCookbook(req, res) {
    if (req.method !== 'PUT') {
        // Only allow PUT requests
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const session = await getSession({ req });
    if (!session) {
        res.status(401).json({ message: 'Not Authenticated' });
        return;
    }

    const { id, title, description, recipes } = JSON.parse(req.body)
    const recipeArray = [];
    recipes.map(recipe => {
        recipeArray.push(ObjectId(recipe._id));
    });
    console.log(recipeArray);

    try {
        const client = await clientPromise;
        const db = await client.db("CBD");
        const collection = await db.collection("Cookbooks");

        // Update the cookbook in database
        const result = await collection.updateOne(
            { _id: ObjectId(id) },
            {
                $set: {
                    title,
                    "recipes": recipeArray,
                    description
                },
            }
        );

        if (result.modifiedCount === 0) {
            // If no matching cookbook found, return not found status
            res.status(404).json({ message: 'Cookbook not found' });
            return;
        }

        res.status(200).json({ message: 'Cookbook updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}