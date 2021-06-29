const express = require("express");
const package = require("../package.json");
const config = require("./config.js");
const app = express();

const {
  default: { CLOUD, ENV },
} = config;

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res, next) => {
  res.json({
    message: `Time to go to sleep Basherbot from ${ENV}`,
    cloud: CLOUD,
    environment: ENV,
    name: package.name,
    version: package.version,
    author: package.author,
  });
});
