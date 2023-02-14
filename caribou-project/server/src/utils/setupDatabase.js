const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');
const log = require('./logger');

const setupDatabase = async () => {
  await mongoose.set('strictQuery', false);
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      log('info', 'Successfully Connected to the MongoDB Database');
    })
    .catch(error => {
      log('error', 'Error connecting to MongoDB:', error.message);
    });
};

// Checking The Mongoose Connection
mongoose.connection.once('open', () => {
  log('info', 'MongoDB Connection is Ready!');
});
mongoose.connection.on('error', err => {
  log('error', `Error Connecting to MongoDB`, err, err.message);
});

module.exports = setupDatabase;
