const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const createError = require('http-errors');
const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = require('../utils/config');
// const HTTP_STATUS = require('http-status-codes');
const log = require('../utils/logger');

const firstLetterUppercase = str => {
  const valueString = str.toLowerCase();
  return valueString
    .split(' ')
    .map(value => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
    .join(' ');
};

const lowerCase = str => {
  return str.toLowerCase();
};

// Generating keys for the access token
const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');
// console.log(key1); // To generate the access token
// console.log(key2);

// JWT Tokens
const signAccessToken = userData => {
  return new Promise((resolve, reject) => {
    // Creating a new Promise.
    const payload = {}; // additional info to save in the token
    const secret = JWT_ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '24h',
      issuer: 'https:localhost:3000',
      audience: userData,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log('err.message', err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, _res, next) => {
  // check if authorization is present
  if (!req.headers['authorization']) return next(createError.Unauthorized());

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const postToken = bearerToken[2]; // the actual token
  const getToken = bearerToken[1]; // the actual token

  const token = postToken ? postToken : getToken;
  // console.log('Payload Token Found:', token);

  // Now verify the token
  JWT.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
    // console.log('Payload Token Found JWT:', token, 'accessToken:', JWT_ACCESS_TOKEN_SECRET);
    if (err) {
      log('Error:', err, 'Helpers');
      if (err.name === 'JsonWebTokenError') {
        return next(createError.Unauthorized());
      } else if (err) {
        return next(createError.Unauthorized(err.message));
      }
    }
    req.payload = payload;
    // console.log('payload:', payload);
    next();
  });
};

// JWT Refresh Token
const signRefreshToken = userData => {
  return new Promise((resolve, reject) => {
    // Creating a new Promise.
    const payload = {}; // additional info to save in the token
    const secret = JWT_REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1y',
      issuer: 'https:localhost:3000',
      audience: userData,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        log('error', err.message, 'helpers');
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyRefreshToken = refreshToken => {
  return new Promise((resolve, reject) => {
    // Creating a new Promise.
    const secret = JWT_REFRESH_TOKEN_SECRET;

    JWT.verify(refreshToken, secret, (err, payload) => {
      if (err) {
        log('error', err.message, 'helpers');
        return reject(createError.Unauthorized());
      }
      const userId = payload.aud; // user uuid
      resolve(userId);
    });
  });
};

module.exports = {
  lowerCase,
  firstLetterUppercase,
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
