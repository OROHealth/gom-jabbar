const express = require('express');
const app = express();
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');

app.use(express.json());

// Security Middle-wares
app.use(hpp());
app.use(helmet());
app.use(cors('*'));

module.exports = app;
