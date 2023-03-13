import clientPromise from '../../../../lib/mongodb';
import Comment from '../../../../models/commentModel';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addComment(req, res) {


    if (req.method === 'POST') {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}