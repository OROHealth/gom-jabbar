const http = require('http');
const app = require('./app'); // express app
const server = http.createServer(app); // instance of server
const { SERVER_PORT, NODE_ENV } = require('./utils/config');
const setupDatabase = require('./utils/setupDatabase');
const log = require('./utils/logger');

// Starting server ~ Connect to mongo then start server
async function startServer() {
  log('info', 'Connecting to: MongoDB');
  setupDatabase();

  server.listen(SERVER_PORT, () => {
    log('info', `Server running on port ${SERVER_PORT} in '${NODE_ENV}' mode`);
  });
}

const shutDownProperly = exitCode => {
  Promise.resolve()
    .then(() => {
      log('error', 'Shutdown complete');
      process.exit(exitCode);
    })
    .catch(error => {
      log('error', `Error during shutdown: ${error}`);
      process.exit(1);
    });
};

const handleExit = () => {
  process.on('unCaughtException', error => {
    log('error', `There was an uncaught error: ${error}`);
    shutDownProperly(1);
  });

  process.on('unHandleRejection', reason => {
    log('error', `Unhandled rejection at promise: ${reason}`);
    shutDownProperly(2);
  });

  process.on('SIGTERM', () => {
    log('error', 'Caught SIGTERM');
    shutDownProperly(2);
  });

  process.on('SIGINT', () => {
    log('error', 'Caught SIGINT');
    shutDownProperly(2);
  });

  process.on('exit', () => {
    log('error', 'Exiting');
  });
};

startServer();
handleExit();
