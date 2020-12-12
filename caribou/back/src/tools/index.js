const crypto = require("crypto");
const R = require("ramda");

const generateSalt = () => crypto.randomBytes(64).toString("hex").slice(0, 64);

const generateToken = () => crypto.randomBytes(128).toString("hex").slice(0, 128);

const hashPassword = (password, salt = "") => {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
};

const propToRemove = [
  "password",
];

const removePrivateProperties = (_log) => {
  const log = R.clone(_log);
  Object.keys(log).forEach(key => {
    if (typeof log[key] === "object") {
      log[key] = removePrivateProperties(log[key]);
    } else if ((typeof log[key] === "string" || typeof log[key] === "number") && R.includes(key, propToRemove)) {
      log[key] = "**********";
    }
  });
  return log;
};

module.exports = {
  generateSalt,
  generateToken,
  hashPassword,
  removePrivateProperties
};
