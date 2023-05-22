import clientPromise from '../../../../lib/mongodb';
import Recipe from '../../../../models/recipeModel';
import { getSession } from "next-auth/react";
import { ObjectId } from 'mongodb';

export default async function addRecipe(req, res) {
    const session = await getSession({ req });

    if (req.method === 'POST') {
        try {
            const { title, description, ingredients, instructions } = req.body;

            const client = await clientPromise;
            const db = await client.db("CBD");
            const userCollection = await db.collection("Users");
            const recipeCollection = await db.collection("Recipes");

            const recipe = new Recipe({
                title,
                description,
                ingredients,
                instructions
            });

            const existingRecipe = await recipeCollection.findOne({ _id: ObjectId(req.body._id) });
            if (existingRecipe) {
                console.log('Recipe already exists');

                return res.json({ msg: 'Recipe Already Exists' });
            }

            const result = await recipeCollection.insertOne(recipe);
            await userCollection.updateOne(
                { email: session.user.email },
                { $addToSet: { "cookbooks.allRecipes": ObjectId(recipe._id) } }
            );

            return res.json({ msg: 'Recipe created', recipe });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'An error occurred while adding the recipe' });
        }
    } else {
        return res.status(400).json('Invalid request');
    }
}
