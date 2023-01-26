import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(request, response) {

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    const results = await collection.find({}).project({
        "grades": 0,
        "borough": 0,
        "restaurant_id": 0
    })
        .limit(10).toArray();

    response.status(200).json(results);
} 