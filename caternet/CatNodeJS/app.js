require("dotenv").config();
var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");
const logger = require('parse-server').logger;
var googlePubSub = require('./googlePubSub.js');

var api = new ParseServer({
    databaseURI: process.env.DATABASE_URL,
    cloud: './cloud.js',
    appId: process.env.APP_ID,
    appName: process.env.APP_NAME,
    serverURL: process.env.PARSE_SERVER_URL, 
    masterKey:  process.env.MASTER_KEY
  });

var options = { allowInsecureHTTP: true };

var dashboard = new ParseDashboard(
    {
      apps: [
        {
          serverURL: process.env.PARSE_SERVER_URL,
          appId: process.env.APP_ID,
          masterKey: process.env.MASTER_KEY,
          appName: process.env.APP_NAME
        }
      ],
      users: [
        {
          user: "admin",
          pass: "admin"
        }
      ],
      useEncryptedPasswords: false
    },
    options
);
var app = express(); // make the Parse Server available at /parse

app.use("/parse", api); // make the Parse Dashboard available at /dashboard

var httpServer = require("http").createServer(app);
httpServer.listen(1337);

//create dashboard to different port
var app2 = express(); 
app2.use("/", dashboard);
var httpServer2 = require("http").createServer(app2);
httpServer2.listen(1338);

