import clientPromise from '../../../../lib/mongodb';
import Recipe from '../../../../models/recipeModel'
import { getSession } from "next-auth/react";
import { ObjectID } from 'bson';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addRecipe(req, res) {
    const session = await getSession({ req });

    if (req.method === 'POST') {
        // Process a POST request
        try {
            // Get user from database, access their cookbooks
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const userCollection = await db.collection("Users");
            console.log(session);
            const userData = await userCollection.findOne({ email: session.user.email });

            // Create new recipe model
            const recipe = new Recipe({
                title: req.body.title,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions
            });

            // Check if new recipe already exists
            const oldRecipe = await db.collection("Recipes").findOne({ _id: ObjectID(req.body._id) });
            if (oldRecipe) {
                console.log('Recipe already exists');
                // Add recipe id to user's allRecipes
                console.log(recipe.id, recipe._id)
                await userCollection.updateOne(
                    { email: session.user.email },
                    { $push: { "cookbooks.allRecipes": ObjectID(req.body._id) } }
                );
                return res.json({ msg: 'Recipe Added', recipe });
            }

            // Add recipe to recipe collection
            const result = await db.collection("Recipes").insertOne(recipe);

            // Add recipe id to user's allRecipes
            await userCollection.updateOne(
                { email: session.user.email },
                { $push: { "cookbooks.allRecipes": ObjectID(req.body._id) } }
            );

            // Update session object
            session.user.cookbooks.allRecipes.push(ObjectID(req.body._id));

            // Return success and redirect user to homepage
            return res.json({ msg: 'Recipe created', recipe });

        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'An error occurred while adding the recipe' });
        }
    } else {
        return res.status(400).json('Invalid request');
    }
}
