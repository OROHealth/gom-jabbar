// require('events').EventEmitter.prototype._maxListeners = 70;
// require('events').defaultMaxListeners = 70;
const http = require('http');
const app = require('./app'); // express app
const { Server } = require('socket.io');
const { SERVER_PORT, NODE_ENV, CLIENT_URL, SERVER_URL } = require('./utils/config');
const { setupDatabase } = require('./utils/setupDatabase');
const log = require('./utils/logger');
const dotenv = require('dotenv');
dotenv.config({});

// webSocket Listeners
const { socketIOAntlerExchangeHandler } = require('./utils/webSockets/antlerExchange');
const { socketIOHumanQuitHandler } = require('./utils/webSockets/humanQuit');
const { socketIOLocationAddedHandler } = require('./utils/webSockets/insertedLocation');
const { socketIOChatMessageHandler } = require('./utils/webSockets/chatMessages');

const startServer = async () => {
  try {
    const server = http.createServer(app); // instance of server
    const io = await createSocketIO(server); // create socketIO
    startHttpServer(server); // Server Starts listing
    socketIOConnections(io); // SocketIO Connections
  } catch (error) {
    log('error', `Line 15: Error ${error}`, 'index');
  }
};

// Starting server ~ Connect to mongo then start server
async function startHttpServer(server) {
  log('info', `Worker with process id of ${process.pid} has started...`, 'index');
  log('info', `Server has started with process ${process.pid}`, 'index');
  log('info', 'Connecting to the MongoDB Database', 'index');
  // start database
  setupDatabase();

  server.listen(SERVER_PORT, () => {
    log('info', `Server running on port: ${SERVER_PORT} in '${NODE_ENV}' mode`, 'index');
  });

  server.once('listening', event => {
    log('info', 'Ok, server is Listening :)', 'index');
  });

  // Handling - Address already in use Error
  server.once('error', error => {
    if (error.code === 'EADDRINUSE') {
      log('error', `PORT Already in use ${SERVER_PORT}`, 'index');
      shutDownProperly(1);
    }
    if (error.code === 'EPIPE') {
      log('error', `Emitted 'error' event on Socket instance at ${SERVER_PORT}`, 'index');

      shutDownProperly(1);
    }
    if (error.code === 'EACCES') {
      log('error', `Error: Requires elevated privileges ${SERVER_PORT}`, 'index');
      shutDownProperly(1);
    }
    log('info', `HERE IS THE ERROR: Code: ${error.code} Error: ${error} PID: ${process.pid}`, 'index');
  });
}

// Shut Down
const shutDownProperly = exitCode => {
  Promise.resolve()
    .then(() => {
      log('error', 'Shutdown In Progress...', 'index');
      process.kill(process.pid, 'SIGINT');
      process.kill(process.pid, 'SIGTERM');
      log('error', 'Shutdown Completed', 'index');

      const resWithTimeout = setTimeout(() => {
        process.exit(exitCode);
      }, 1000).unref();

      clearTimeout(resWithTimeout);
    })
    .catch(error => {
      log('error', `Catch Error during shutdown: ${error}`, 'index');
      process.exit(1);
    });
};

const handleExit = () => {
  process.on('unCaughtException', error => {
    log('error', `There was an uncaught error: ${error}`, 'index');
    shutDownProperly(1);
  });

  process.on('unHandleRejection', reason => {
    log('error', `Unhandled rejection at promise ${reason}`, 'index');
    shutDownProperly(1);
  });

  process.on('SIGTERM', async () => {
    log('error', 'Caught SIGTERM', 'index');
    shutDownProperly(0);
  });

  process.on('SIGINT', () => {
    log('error', 'Caught SIGINT', 'index');
    shutDownProperly(0);
  });

  process.on('exit', code => {
    log('error', `Everything exited with code: ${code}`, 'index');
  });

  process.stdout.on('error', function (err) {
    if (err.code == 'EPIPE') {
      process.exit(0);
    }
  });
};

// Setup SocketIO
const createSocketIO = async server => {
  const io = new Server(server, {
    cors: {
      origin: [SERVER_URL, CLIENT_URL],
      allRoutes: true,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: 'content-type, Authorization',
    },
  });

  // When socketIO disconnects
  io.once('disconnect', () => {
    log('info', `Connection disconnected`, 'index');
    socket;
  });

  // Listening for events
  io.once('connection', socket => {
    // This Runs Whenever someone opens the website
    // socket.id - this is the id of the user, each user has a different id
    log('info', `Line 128: User connected, ${socket.id}`, 'index');
  });

  io.on('error', function (ex) {
    log('info', 'handled error', 'index');
    log('info', ex, 'index');
    socket.close();
  });

  // io.sockets.setMaxListeners(20);

  return io;
};

const socketIOConnections = io => {
  const antlerExchangeSocketHandler = socketIOAntlerExchangeHandler(io);
  const humanQuitSocketHandler = socketIOHumanQuitHandler(io);
  const locationAddedSocketHandler = socketIOLocationAddedHandler(io);
  const chatroomSocketHandler = socketIOChatMessageHandler(io);
  antlerExchangeSocketHandler();
  humanQuitSocketHandler();
  locationAddedSocketHandler();
  chatroomSocketHandler();
};

handleExit();
startServer();
