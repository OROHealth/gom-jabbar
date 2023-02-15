require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;
const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT;
const NODE_ENV = process.env.NODE_ENV;
const COOKIE_KEY_ONE = process.env.NODE_ENV;
const COOKIE_KEY_TWO = process.env.NODE_ENV;
const CLIENT_URL = process.env.NODE_ENV;

module.exports = {
  MONGODB_URL,
  SERVER_PORT,
  NODE_ENV,
  COOKIE_KEY_ONE,
  COOKIE_KEY_TWO,
  CLIENT_URL,
};
