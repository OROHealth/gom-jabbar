const moment = require('moment');
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';

// TODO close clients after all DB related functions

async function getDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = await client.db('schitts');
    console.log(`Connected to database ${db.databaseName}`);
    return [db, client];
  }
  catch (error) {
    console.log(`An error has occured ${error}`);
  }
}

async function findMenuItem(tableName, id) {
  const res = await getDatabase();
  const db = res[0];
  const client = res[1]; 
  const table = await db.collection(tableName);
  const objectId = ObjectId(id);
  console.log(objectId);
  const searchCursor = await table.find({'_id': objectId});
  const result = await searchCursor.toArray();
  return result;
}

function generateRandomTime(min, max) {
  const currentTime = moment.now();
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomDelta = Math.floor(Math.random() * (max - min + 1)) + min;
  const pastTime = currentTime - randomDelta;
  return pastTime;
}

function generateRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

module.exports = {
  generateRandomTime,
  generateRandomNumber,
  findMenuItem,
};
