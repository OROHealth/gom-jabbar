const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const { JWT_ACCESS_TOKEN } = require('../utils/config');

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
    // aud stands for audience
    const payload = {};
    const secret = JWT_ACCESS_TOKEN;
    const options = {
      expiresIn: '1h',
      issuer: 'https:localhost:3000',
      audience: userData,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

module.exports = {
  lowerCase,
  firstLetterUppercase,
  signAccessToken,
};
