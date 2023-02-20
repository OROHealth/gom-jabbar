const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { MONGODB_URL } = require('./config');
const log = require('./logger');

const client = new MongoClient(MONGODB_URL);

const setupDatabase = async () => {
  try {
    await mongoose.set('strictQuery', false);
    await client.connect(MONGODB_URL).then(async client => {
      log('info', 'Successfully Connected to the MongoDB Database', 'setupDatabase');
      const pipeline = [
        {
          $match: {
            operationType: 'insert',
            'fullDocument.caribou.maps': 'Australia',
          },
        },
      ];
      await monitorListingsUsingEventEmitter(client, 30000, pipeline);
    });
  } catch (error) {
    log('error', `Error connecting to MongoDB: ${error.message}`, 'setupDatabase');
  } finally {
    // Close the connection to the MongoDB cluster
    client.close();
  }
};

// A Helper Function to Close the Change Stream
function closeChangeStream(timeInMs = 60000, changeStream) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Closing the change stream');
      resolve(changeStream.close());
    }, timeInMs);
  });
}

// A connected MongoClient, a time in ms that indicates how long the change stream should be monitored, and an aggregation pipeline that the change stream will use.
async function monitorListingsUsingEventEmitter(setupDatabase, timeInMs = 60000, pipeline = []) {
  // Now I need to access the collection I will monitor for changes.
  const collection = client.db('caribou').collection('maps');
  // create a change stream by using Collection's watch()
  const changeStream = collection.watch(pipeline);

  changeStream.on('change', next => {
    console.log(next);
  });
  // helper function to set a timer and close the change stream.
  await closeChangeStream(timeInMs, changeStream);
}

// Checking The Mongoose Connection
mongoose.connection.once('open', () => {
  log('info', 'MongoDB Connection is Ready!', 'setupDatabase');
});
mongoose.connection.on('error', err => {
  log('error', `Error Connecting to MongoDB: ${err}, ${err.message}`, 'setupDatabase');
});

process.on('SIGINT', () => {
  mongoose.disconnect(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  mongoose.disconnect(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// mongoose.connection.on('disconnected', setupDatabase);

module.exports = setupDatabase;
