// pages/api/topics.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "nextjsdb");
    const collection = db.collection("topics");

    if (req.method === "POST") {
      const { title, description } = req.body || {};

      if (!title || !description) {
        return res.status(400).json({ message: "Title and description required" });
      }

      const doc = { title, description, createdAt: new Date() };
      const result = await collection.insertOne(doc);

      return res.status(201).json({ _id: result.insertedId, ...doc });
    }

    if (req.method === "GET") {
      const topics = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(topics);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("❌ Error in /api/topics:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
