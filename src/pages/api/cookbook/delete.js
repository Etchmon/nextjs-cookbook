// Imports
import clientPromise from "../../../../lib/mongodb";
import { getSession } from "next-auth/react";

export default async function deleteCookbook(req, res) {
    if (req.method !== 'DELETE') {
        // Only allow DELETE requests
        res.status(405).json({ message: 'Method not Allowed' });
        return;
    }

    const session = getSession({ req });
    if (!session) {
        res.status(401).json({ message: 'Not Authenticated' });
        return;
    }

    const { id } = req.body;

    try {
        const client = await clientPromise;
        const db = await client.db("CBD");
        const cookbookCollection = await db.collection("Coobooks");

        // Delete the cookbook in the database
        const result = await collection.findOneAndDelete(
            { _id: id }
        );

        if (result.modifiedCount === 0) {
            //  If no matching cookbook found, return not found status
            res.status(404).json({ message: 'Cookbook not found' });
            return;
        }

        res.status(200).json({ message: 'Cookbook deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}