import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

console.log(">>> MONGODB_URI:", uri); // Log the URI to check if it's correct

if (!uri) {
  throw new Error("MONGODB_URI is not set. Add it in .env.local (local) or as an env var in your host.");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {});
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
}

export default clientPromise;
