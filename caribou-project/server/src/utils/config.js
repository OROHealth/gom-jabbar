// require('dotenv').config({});
const dotenv = require('dotenv');
dotenv.config({});

const environment = process.env.NODE_ENV;
let client = 'http://localhost:3000';

if (environment !== 'development') {
  client = process.env.CLIENT_URL;
}

const MONGODB_URL = process.env.MONGODB_URL;
const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT;
const SERVER_PORT_TWO = process.env.SERVER_PORT_TWO;
const NODE_ENV = process.env.NODE_ENV;
const COOKIE_KEY_ONE = process.env.COOKIE_KEY_ONE;
const COOKIE_KEY_TWO = process.env.COOKIE_KEY_TWO;
const CLIENT_URL = client;
const SERVER_URL = process.env.SERVER_URL;
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;

module.exports = {
  MONGODB_URL,
  SERVER_PORT,
  SERVER_PORT_TWO,
  NODE_ENV,
  COOKIE_KEY_ONE,
  COOKIE_KEY_TWO,
  CLIENT_URL,
  SERVER_URL,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
};
