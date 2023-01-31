import clientPromise from "../../../lib/mongodb";

export default async function handler(request, response) {

    try {
        const MongoClient = await clientPromise;
        const db = MongoClient.db('CBD');
        const collection = db.collection("Users");
        const results = await collection.find({}).project({
            grades: 0,
            borough: 0,
            restaurant_id: 0,
        }).limit(10).toArray();
        response.status(200).json(results);
    } catch (e) {
        console.log(e)
    }
} 