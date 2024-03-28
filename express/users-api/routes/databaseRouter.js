import express from "express";
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "users-db";
console.log("Started");

async function connect() {
  console.log("Connection started");
  await client.connect();
  console.log("Connected");

  const db = client.db(dbName);
  const collection = db.collection("articles");

  const articlesArray = await collection.find({}).toArray();
  console.log(articlesArray);
  return collection;
}

connect()
  .then((col) => {})
  .catch((er) => {
    console.error("Something went wrong", er);
  });
