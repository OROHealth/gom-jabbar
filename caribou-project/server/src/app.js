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
const { COOKIE_KEY_ONE, COOKIE_KEY_TWO, CLIENT_URL, NODE_ENV } = require('./utils/config');
const userRouter = require('./routes/userRouter');

// Security Middle-wares
app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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

// Api Monitoring
app.use(
  apiStats.getMiddleware({
    uriPath: '/api-monitoring',
  })
);

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
