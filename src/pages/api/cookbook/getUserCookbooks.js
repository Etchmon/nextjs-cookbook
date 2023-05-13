import clientPromise from "../../../../lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectID } from "bson";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function myCookbooks(req, res) {
    const session = await getSession({ req });

    if (req.method === "GET") {
        // Process a GET request
        const sessionCookbooks = session.user.cookbooks.myBooks;

        try {
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const collection = await db.collection("Cookbooks");

            const promises = sessionCookbooks.map((cookbook) =>
                collection.findOne({ _id: ObjectID(cookbook) })
            );

            const results = await Promise.all(promises);
            const myCookbooks = results.filter((result) => result !== null);

            res.status(200).json(myCookbooks);
        } catch (e) {
            console.log(e);
        }
    }
}
