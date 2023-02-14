require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;
const SERVER_PORT = process.env.SERVER_PORT;

module.exports = {
  MONGODB_URL,
  SERVER_PORT,
};
