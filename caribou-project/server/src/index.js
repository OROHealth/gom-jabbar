const http = require('http');
const app = require('./app'); // express app
const server = http.createServer(app); // instance of server
const { Server } = require('socket.io');
const { SERVER_PORT, NODE_ENV, CLIENT_URL, SERVER_URL } = require('./utils/config');
const setupDatabase = require('./utils/setupDatabase');
const log = require('./utils/logger');
const mongoose = require('mongoose');

// Starting server ~ Connect to mongo then start server
async function startServer() {
  log('info', `Worker with process id of ${process.pid} has started...`, 'index');
  log('info', `Server has started with process ${process.pid}`, 'index');
  log('info', 'Connecting to the MongoDB Database', 'index');
  setupDatabase();

  server.listen(SERVER_PORT, () => {
    log('info', `Server running on port: ${SERVER_PORT} in '${NODE_ENV}' mode`, 'index');
  });

  server.on('listening', event => {
    log('info', 'Ok, server is running :)', 'index');
  });

  // Handling - Address already in use Error
  server.on('error', error => {
    if (error.code === 'EADDRINUSE') {
      log('error', `PORT Already in use ${SERVER_PORT}`, 'index');
      shutDownProperly(1);
    }
    if (error.code === 'EPIPE') {
      log('error', `Emitted 'error' event on Socket instance at ${SERVER_PORT}`, 'index');
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

      // Closing Mongoose
      mongoose.disconnect(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });

      // Closing Server
      log('error', 'Http Server closed', 'index');
      server.close(() => {
        process.exit(0);
      });

      log('error', 'Exiting Processes', 'index');
      process.kill(process.pid, 'SIGINT');
      process.kill(process.pid, 'SIGTERM');
      log('error', 'Shutdown Completed', 'index');
      setTimeout(() => {
        process.exit(0);
      }, 1000).unref();
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
};

// Setup SocketIO
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

// Listening for events
io.on('connection', socket => {
  // This Runs Whenever someone opens the website
  // socket.id - this is the id of the user, each user has a different id
  console.log(`User connected, ${socket.id}`);

  // Listen to the send message event
  socket.on('send_Message', data => {
    // broadcast message
    socket.broadcast.emit('received_message', data);
    console.log(data);
  });

  // Send a antler exchange broadcast
  socket.on('antler_exchange', data => {
    console.log(data);
    socket.broadcast.emit('antler_exchange_broadcast', data);
  });
});

handleExit();
startServer();
