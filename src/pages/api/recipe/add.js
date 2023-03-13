import clientPromise from '../../../../lib/mongodb';
import Recipe from '../../../../models/recipeModel'
import { getSession } from "next-auth/react";


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addRecipe(req, res) {
    const session = await getSession({ req })

    if (req.method === 'POST') {
        // Process a POST request
        try {
            // Get user from database acess their cookbooks
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const userCollection = await db.collection("Users");
            const userData = await userCollection.findOne({ email: session.user.email });

            // Create new recipe model
            const recipe = new Recipe({
                title: req.body.title,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                images: req.body.images
            });

            // Add recipe to recipe collection and recipe id to user's allRecipes
            const result = await db.collection("Recipes").insertOne(recipe);
            const userUpdate = await userData.cookbooks.allRecipes.insertOne(recipe.id);

            // Update session object
            const sessionUpdate = session.user.cookbooks.allRecipes.push(recipe.id);

            console.log([result, userUpdate, sessionUpdate, userData])

            // Return success and redirect user to homepage
            return res.json({ msg: 'recipe created ', recipe });

        } catch (e) {
            console.log(e)
        }
    } else {
        return res.json('NOT A POST METHOD');
    }

}