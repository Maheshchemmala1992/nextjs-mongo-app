// pages/api/topics.js

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "nextjsdb");
    const collection = db.collection("topics");

    if (req.method === "POST") {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      const result = await collection.insertOne({ title, content, createdAt: new Date() });
      return res.status(201).json({ message: "Topic added", topicId: result.insertedId });
    }

    if (req.method === "GET") {
      const topics = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(topics);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });

  } catch (error) {
    console.error("❌ API error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
