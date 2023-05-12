import clientPromise from '../../../../lib/mongodb';
import { getSession } from "next-auth/react";
import { ObjectID } from 'bson';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function myCookbooks(req, res) {
    const session = await getSession({ req });

    if (req.method === 'GET') {
        // Process a GET request
        const myCookbooks = [];
        const sessionCookbooks = session.user.cookbooks.myBooks;


        try {

            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Cookbooks");

            for (const cookbook of sessionCookbooks) {
                const result = await collection.findOne({ _id: ObjectID(cookbook) });
                if (result === null) {
                    console.log('null');
                } else {
                    myCookbooks.push(result);
                }

            };

            res.status(200).json(myCookbooks);

        } catch (e) {
            console.log(e);
        };


    }
}