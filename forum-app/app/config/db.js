import { MongoClient } from "mongodb";
import { MONGO_URL } from "./env-vars.js";

const client = new MongoClient(MONGO_URL);

const dbName = "forum-db";

let collections;

async function connect() {
  console.log("Initialize connection");
  await client.connect();
  const db = client.db(dbName);
  const usersCollection = db.collection("users");
  const articlesCollection = db.collection("articles");
  const commentsCollection = db.collection("comments");

  collections = {
    users: usersCollection,
    articles: articlesCollection,
    comments: commentsCollection,
  };

  return collections;
}

const getDb = async () => {
  if (!collections) {
    collections = await connect();
  }
  return collections;
};

export default {
  getDb,
};
