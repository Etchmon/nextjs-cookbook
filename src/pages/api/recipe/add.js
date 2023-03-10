import clientPromise from '../../../../lib/mongodb';
import { getSession } from "next-auth/react";


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addRecipe(req, res) {
    const session = await getSession({ req })

    try {
        console.log(session)
    } catch (e) {
        console.log(e)
    }

}