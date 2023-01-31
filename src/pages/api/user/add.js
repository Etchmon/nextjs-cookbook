import clientPromise from '../../../../lib/mongodb';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addUser(req, res) {

    try {
        const MongoClient = await clientPromise;
    } catch (e) {
        console.log(e);
    }


}