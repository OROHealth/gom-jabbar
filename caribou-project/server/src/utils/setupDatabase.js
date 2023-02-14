const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');

const setupDatabase = async () => {
  await mongoose.set('strictQuery', false);
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log('Connected to the MongoDB Database');
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error.message);
    });
};

// Checking The Mongoose Connection
mongoose.connection.once('open', () => {
  console.log('MongoDB Connection is Ready!');
});
mongoose.connection.on('error', err => {
  console.log(`Error Connecting to MongoDB`, err, err.message);
});

module.exports = setupDatabase;
