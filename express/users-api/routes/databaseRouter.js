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
  const peopleCollection = db.collection("people");

  // // await insertOnePerson(peopleCollection);

  await deleteEntireCollection(peopleCollection);
  await insertMultiplePeople(peopleCollection);
  // await updatePersonDocument(peopleCollection);
  // await updatePeopleDocuments(peopleCollection);
  // await deletePersonDocument(peopleCollection);

  const peopleArray = await peopleCollection.find({}).toArray();
  const person = await findPersonAfterName(peopleCollection);
  console.log(person);

  const articlesArray = await collection.find({}).toArray();
  return collection;
}

connect()
  .then((col) => {})
  .catch((er) => {
    console.error("Something went wrong", er);
  });

const insertOnePerson = async (collection) => {
  const peopleTestDocument = {
    name: "John",
    surname: "Doe",
    age: 30,
  };
  return collection.insertOne(peopleTestDocument);
};

const insertMultiplePeople = async (collection) => {
  const peopleList = [];
  const surnames = [
    "Alex",
    "John",
    "Sarah",
    "Jane",
    "Oliver",
    "Alfred",
    "Alex",
  ];
  const names = ["T", "D", "S", "B", "C", "D", "F"];
  const ages = [23, 35, 16, 45, 35, 45, 30];
  const cities = [
    "Bucuresti",
    "Timisoara",
    "Sibiu",
    "Oradea",
    "Timisoara",
    "Bucuresti",
  ];

  for (let i = 0; i < surnames.length; i++) {
    peopleList.push({
      name: names[i],
      surname: surnames[i],
      age: ages[i],
      city: cities[i],
    });
  }

  return collection.insertMany(peopleList);
};

const deleteEntireCollection = async (collection) => {
  return collection.drop();
};

const updatePersonDocument = async (collection) => {
  return collection.updateOne(
    {
      surname: "Alex",
      name: "F",
    },
    {
      $set: { name: "A" },
    }
  );
};

const updatePeopleDocuments = async (collection) => {
  return collection.updateMany(
    {
      surname: "Alex",
    },
    {
      $set: { name: "A" },
    }
  );
};

const deletePersonDocument = async (collection) => {
  return collection.deleteOne({
    surname: "Alex",
  });
};

const findPersonAfterName = async (collection, name) => {
  return collection
    .find({
      age: { $gt: 22 },
      name: "T",
    })
    .toArray();
};
