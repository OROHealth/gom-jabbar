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

const toRadian = (degree) => {
  return degree * Math.PI / 180;
};

const getDistance = (locationA, locationB) => {
  const lng1 = toRadian(locationA.lng);
  const lat1 = toRadian(locationA.lat);
  const lng2 = toRadian(locationB.lng);
  const lat2 = toRadian(locationB.lat);

  const deltaLat = lat2 - lat1;
  const deltaLon = lng2 - lng1;

  const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
};

module.exports = {
  generateSalt,
  generateToken,
  hashPassword,
  removePrivateProperties,
  getDistance,
};
