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
    });
};

// Checking The Mongoose Connection
mongoose.connection.once('open', () => {
  log('info', 'MongoDB Connection is Ready!', 'setupDatabase');
});
mongoose.connection.on('error', err => {
  log('error', `Error Connecting to MongoDB: ${err}, ${err.message}`, 'setupDatabase');
});

module.exports = setupDatabase;
