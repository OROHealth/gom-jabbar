const http = require('http');
const app = require('./app'); // express app
const server = http.createServer(app); // instance of server
const { SERVER_PORT, NODE_ENV } = require('./utils/config');
const setupDatabase = require('./utils/setupDatabase');
const log = require('./utils/logger');

// Starting server ~ Connect to mongo then start server
async function startServer() {
  log('info', 'Connecting to: MongoDB', 'index');
  setupDatabase();

  log('info', `Worker with process id of ${process.pid} has started...`, 'index');
  log('info', `Server has started with process ${process.pid}`, 'index');
  server.listen(SERVER_PORT, () => {
    log('info', `Server running on port ${SERVER_PORT} in '${NODE_ENV}' mode`, 'index');
  });
}

const shutDownProperly = exitCode => {
  Promise.resolve()
    .then(() => {
      log('error', 'Shutdown complete', 'index');
      process.exit(exitCode);
    })
    .catch(error => {
      log('error', `Error during shutdown: ${error}`, 'index');
      process.exit(1);
    });
};

const handleExit = () => {
  process.on('unCaughtException', error => {
    log('error', `There was an uncaught error: ${error}`, 'index');
    shutDownProperly(1);
  });

  process.on('unHandleRejection', reason => {
    log('error', `Unhandled rejection at promise: ${reason}`, 'index');
    shutDownProperly(2);
  });

  process.on('SIGTERM', async () => {
    log('error', 'Caught SIGTERM', 'index');
    await shutDownProperly(2);
  });

  process.on('SIGINT', () => {
    log('error', 'Caught SIGINT', 'index');
    shutDownProperly(2);
  });

  process.on('exit', () => {
    log('error', 'Exiting', 'index');
  });
};

handleExit();
startServer();
