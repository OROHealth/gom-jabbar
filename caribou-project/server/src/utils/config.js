require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;
const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT;
const NODE_ENV = process.env.NODE_ENV;
const COOKIE_KEY_ONE = process.env.COOKIE_KEY_ONE;
const COOKIE_KEY_TWO = process.env.COOKIE_KEY_TWO;
const CLIENT_URL = process.env.CLIENT_URL;
const SERVER_URL = process.env.SERVER_URL;

module.exports = {
  MONGODB_URL,
  SERVER_PORT,
  NODE_ENV,
  COOKIE_KEY_ONE,
  COOKIE_KEY_TWO,
  CLIENT_URL,
  SERVER_URL,
};
