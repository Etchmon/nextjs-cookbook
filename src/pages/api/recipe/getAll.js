import clientPromise from '../../../../lib/mongodb';
import Recipe from '../../../../models/recipeModel'
import { getSession } from "next-auth/react";


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function myRecipes(req, res) {
    const session = await getSession({ req });
    console.log(session);

    if (req.method === 'GET') {
        // Process a GET request
        const myRecipes = [];
        const sessionRecipes = session.user.cookbooks.allRecipes;
        try {
            console.log(session.user.cookbooks.allRecipes);

            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Recipes");

            sessionRecipes.forEach(recipe => {
                console.log(recipe);
                myRecipes.push(recipe);
            });


        } catch (e) {
            console.log(e);
        }
    }
}