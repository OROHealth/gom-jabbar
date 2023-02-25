const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');
const log = require('./logger');

const setupDatabase = async () => {
  await mongoose.set('strictQuery', false);
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      log('info', 'Successfully Connected to the MongoDB Database', 'setupDatabase');
    })
    .catch(error => {
      log('error', `Error connecting to MongoDB: ${error.message}`, 'setupDatabase');
      return process.exit(1);
    });
  return mongoose;
};

mongoose.connection.once('open', () => {
  log('info', 'Line 19: MongoDB Connection is Ready and Open!', 'setupDatabase');
});

mongoose.connection.on('error', err => {
  log('error', `Error Connecting to MongoDB: ${err}, ${err?.message}`, 'setupDatabase');
});
mongoose.connection.on('connected', () => {
  log('info', `Line 59: Connected to MongoDB`, 'setupDatabase');
});
mongoose.connection.on('disconnected', err => {
  log('error', `Mongoose Connection is disconnected`, 'setupDatabase');
  return setupDatabase;
});

// This event is fired when the application is terminated by pressing control + z
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); // terminate the app with process of 0
  });
});
process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = { setupDatabase };
