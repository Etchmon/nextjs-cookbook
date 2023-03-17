import clientPromise from '../../../../lib/mongodb';
import Cookbook from '../../../../models/cookbookModel';
import { getSession } from "next-auth/react";


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addCookbook(req, res) {
    const session = await getSession({ req });

    if (req.method === 'POST') {
        try {
            // Connect to database
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Cookbooks");
            const userCollection = await db.collection("Users");
            const userData = await userCollection.findOne({ email: session.user.email });

            // Create new cookbook model
            const cookbook = new Cookbook({
                title: req.body.title,
                description: req.body.description
            });

            // Add cookbook to cookbook collection and cookbook id to users cookbooks
            const result = await db.collection("Cookbooks").insertOne(cookbook);
            const userUpdate = await await userCollection.updateOne({ email: session.user.email }, { $push: { "cookbooks.myBooks": cookbook.id } });

            // Return success
            return res.json({ msg: 'cookbook created ', cookbook });
        } catch (e) {
            console.log(e);
        }
    }
}