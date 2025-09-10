// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("❌ Please add your MongoDB URI to .env.local or GitHub Secrets (MONGODB_URI)");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse connection in dev mode to avoid multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
