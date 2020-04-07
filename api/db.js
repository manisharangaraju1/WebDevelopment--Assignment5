require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;
const url = process.env.DB_URL || 'mongodb+srv://manisha:manisha@cluster0-bxsg8.mongodb.net/test';

async function connectToDatabase() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to Database');
    db = client.db();
  }

async function getNextSequence(name) {
const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
);
return result.value.current;
}

function getDatabase() {
    return db;
}

module.exports = { connectToDatabase, getNextSequence, getDatabase };
