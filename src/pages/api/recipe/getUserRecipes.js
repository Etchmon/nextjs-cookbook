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
    console.log(session);

    if (req.method === 'GET') {
        // Process a GET request
        const myRecipes = [];
        const sessionRecipes = session.user.cookbooks.allRecipes;
        console.log(sessionRecipes[1])

        try {

            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Recipes");

            const result = await collection.findOne({ _id: ObjectID(sessionRecipes[1]) });
            console.log(result);

            // sessionRecipes.forEach(async recipe => {
            //     console.log(recipe);

            //     myRecipes.push(result);
            // });

            res.status(200).json(myRecipes);


        } catch (e) {
            console.log(e);
        }
    }
}