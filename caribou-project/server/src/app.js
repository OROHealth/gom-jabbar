const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

module.exports = app;
