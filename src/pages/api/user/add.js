import clientPromise from '../../../../lib/mongodb';
import User from '../../../../models/userModel';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addUser(req, res) {

    if (req.method === 'POST') {
        // Process a POST request
        try {

            const MongoClient = await clientPromise;
            const db = MongoClient.db('CBD');
            const collection = db.collection("Users");

            const user = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });

            const result = await collection.insertOne(user);

            return res.json({ msg: 'user created ', user });

        } catch (e) {
            console.log(e);
        }
    } else {
        return res.json('NOT A POST METHOD');
    }

}