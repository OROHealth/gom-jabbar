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
const { COOKIE_KEY_ONE, COOKIE_KEY_TWO, CLIENT_URL, NODE_ENV } = require('./utils/config');

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

// Routes Middle-wares
// applicationRoutes(app);

// Api Monitoring
app.use(
  apiStats.getMiddleware({
    uriPath: '/api-monitoring',
  })
);

// Global Error Handler
app.all('*', (req , res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
});

  app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    log.error(error);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
}

module.exports = app;
