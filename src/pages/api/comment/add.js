import clientPromise from '../../../../lib/mongodb';
import Comment from '../../../../models/commentModel';


/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function addComment(req, res) {


    if (req.method === 'POST') {
        try {
            // Get collection info from Database
            const MongoClient = await clientPromise;
            const db = await MongoClient.db("CBD");
            const commentCollection = await db.collection("Comments");
            const recipe = await db.collection("Recipes").findOne({ _id: req.body.recipeId });

            // Create new comment model
            const comment = new Comment({
                text: req.body.text,
                author: req.body.author
            });

            // Add comment to comment collection and comment id to the recipes comments array
            const result = await commentCollection.insertOne(comment);
            const recipeUpdate = recipe.comments.push(comment.id);

            console.log([result, recipeUpdate])

            // Return success
            return res.json({ msg: 'comment created ', comment });
        } catch (e) {
            console.log(e);
        }
    } else {
        return res.json('NOT A POST METHOD');
    }
}