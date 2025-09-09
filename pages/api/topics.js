import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjsdb");
  const collection = db.collection("topics");

  if (req.method === "POST") {
    const { title, description } = req.body || {};
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }
    const result = await collection.insertOne({ title, description, createdAt: new Date() });
    return res.status(201).json({ _id: result.insertedId, title, description });
  }

  if (req.method === "GET") {
    const topics = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(topics);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
