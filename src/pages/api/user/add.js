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
            const db = await MongoClient.db('CBD');
            const collection = await db.collection("Users");
            const userExists = await collection.findOne({ email: req.body.email.toLowerCase() })
            const usernameExists = await collection.findOne({ username: req.body.username })
            console.log(userExists, usernameExists)
            if (userExists && userExists != null) {
                return res.json({ email: true })
            } else if (usernameExists) {
                return res.json({ username: true })
            }

            const user = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email.toLowerCase()
            });

            const result = await collection.insertOne(user);

            return res.json({ msg: 'user created ', user });

        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Failed to insert user into database' });
        }
    } else {
        return res.json('NOT A POST METHOD');
    }

}