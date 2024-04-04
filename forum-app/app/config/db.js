import express from "express";
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "forum-db";

let collections;

async function connect() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");

  collections = {
    users: collection,
  };

  return collections;
}

export default {
  connect,
};
