const JWT = require('jsonwebtoken');

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

// JWT Tokens
const signAccessToken = userData => {
  return new Promise((resolve, reject) => {
    const payload = {
      name: 'gioa',
    };
    const secret = 'wteheed';
    const options = {};

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
