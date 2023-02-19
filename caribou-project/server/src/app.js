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
const client = require('./helpers/initRedis');

// Routers
const userRouter = require('./routes/userRouter');
const mapRouter = require('./routes/mapRouter');

// Security Middle-wares
app.use(hpp());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      allowOrigins: ['*'],
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['*'],
        scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
      },
    },
  })
);
app.use(
  cors({
    origin: ['*', SERVER_URL, CLIENT_URL],
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
// app.use('/api/v1/map', mapRouter); // test without token
app.use('/api/v1/map', verifyAccessToken, mapRouter);

// Health check route - endpoint that returns a 200 status code if your application is running
app.get('/_health', (req, res) => {
  res.status(200).send('ok');
});

// Api Monitoring
app.use(
  apiStats.getMiddleware({
    uriPath: '/api-monitoring',
  })
);

// Redis
async () => {
  await client.connect();

  await client.SET('foo', 'bar');

  const value = await client.get('foo');

  console.log('Redis', value);
};

// Global Error Handler
app.all('*', (req, res) => {
  // catches all unFound urls
  res.status(HTTP_STATUS.StatusCodes.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
});

app.get('/*', (req, res) => {
  // catches all unFound urls
  res.status(HTTP_STATUS.StatusCodes.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
});

app.use((error, _req, res, next) => {
  log('error', error, 'app.js');
  if (error) {
    console.log('There is a error:', error);
    return res.status(HTTP_STATUS.StatusCodes.NOT_FOUND).json({ message: 'Page not found' });
  }
  next();
});

module.exports = app;
