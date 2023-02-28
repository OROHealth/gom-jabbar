const express = require('express');
const app = express();
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const compression = require('compression');
const cookieSession = require('cookie-session');
const HTTP_STATUS = require('http-status-codes');
const apiStats = require('swagger-stats');
require('express-async-errors');
const log = require('./utils/logger');
const morgan = require('morgan');
const { COOKIE_KEY_ONE, COOKIE_KEY_TWO, CLIENT_URL, NODE_ENV, SERVER_URL } = require('./utils/config');
const { verifyAccessToken } = require('./helpers/helpers');

// Routers
const userRouter = require('./routes/userRouter');
const mapRouter = require('./routes/mapRouter');
const antlerExchangeRouter = require('./routes/antlerExchangeRouter');
const chatroomRouter = require('./routes/chatroomRouter');

// Security Middle-wares
app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: ['*', 'https://caribou-newproject.fly.dev', SERVER_URL, CLIENT_URL],
    allRoutes: true,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: 'content-type, Authorization',
    crossOriginEmbedderPolicy: 'same-origin',
    'Access-Control-Allow-Origin': '*',
  })
);

app.use(
  cookieSession({
    name: 'session',
    keys: [COOKIE_KEY_ONE, COOKIE_KEY_TWO],
    maxAge: 24 * 7 * 3600000,
    secure: NODE_ENV !== 'development',
    // sameSite: 'none', // comment this line when running the server locally
  })
);

// Standard Middle-wares
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('combined'));

// Routes Middle-wares
app.use('/api/v1/user', userRouter);
app.use('/api/v1/map', verifyAccessToken, mapRouter);
app.use('/api/v1/antler-exchange', verifyAccessToken, antlerExchangeRouter);
app.use('/api/v1/chatroom', verifyAccessToken, chatroomRouter);

// Testing middle-ware
// app.use('/api/v1/map', mapRouter); // test without token
// app.use('/api/v1/antler-exchange', antlerExchangeRouter);

// Health check route - endpoint that returns a 200 status code if your application is running
app.use('/_health', (_req, res) => {
  res.status(200).json({ message: 'ok' });
});

app.use('/', (_req, res) => {
  res.status(200).json({ message: 'ok' });
});

// Api Monitoring
app.use(
  apiStats.getMiddleware({
    uriPath: '/api-monitoring',
  })
);

// Global Error Handler
app.use('/*', (req, res) => {
  // catches all unFound urls
  return res.status(HTTP_STATUS.StatusCodes.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
});

app.use((error, _req, res, next) => {
  log('error', error, 'app.js');
  if (error) {
    log('error', `There is a error: ${error}`, 'app.js');
    return res.status(HTTP_STATUS.StatusCodes.NOT_FOUND).json({ message: 'Page not found' });
  }
  next();
});

module.exports = app;
