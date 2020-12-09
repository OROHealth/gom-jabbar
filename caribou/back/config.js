require('dotenv').config();

const {
  CARIB__MG_USER,
  CARIB__MG_PASSWORD,
  CARIB__MG_HOST,
  CARIB__MG_PORT,
  CARIB__MG_DATABASE,
} = process.env;

module.exports = {
  layers: [
    ["data", "mongo"],
    ["logic"],
    ["presentation"]
  ],
  data: {
    mongo: {
      modelPrefix: "",
      database: CARIB__MG_DATABASE,
      user: CARIB__MG_USER,
      password: CARIB__MG_PASSWORD,
      host: CARIB__MG_HOST,
      port: CARIB__MG_PORT,
    },
  },
  logic: {},
  presentation: {
    port: 33333
  }
};
