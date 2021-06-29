"use strict";

const envalid = require("envalid");

const envApp = envalid.cleanEnv(
  process.env,
  {
    ENV: envalid.str({
      desc: "Environment",
      default: "production",
      devDefault: "development",
    }),
    CLOUD: envalid.str({
      desc: "Cloud",
      default: "local",
      devDefault: "local",
    }),
  },
  {
    dotEnvPath: null,
  }
);

exports.default = {
  CLOUD: envApp.CLOUD,
  ENV: envApp.ENV,
};
