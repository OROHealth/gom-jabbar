const crypto = require("crypto");

const generateSalt = () => crypto.randomBytes(64).toString("hex").slice(0, 64);

const generateToken = () => crypto.randomBytes(128).toString("hex").slice(0, 128);

const hashPassword = (password, salt = "") => {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
};

module.exports = {
  generateSalt,
  generateToken,
  hashPassword
};
