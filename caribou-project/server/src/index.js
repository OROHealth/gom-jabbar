const http = require('http');
const app = require('@root/app'); // express app
const server = http.createServer(app); // instance of server
const { SERVER_PORT, NODE_ENV } = require('@utils/config');
const { setupDatabase } = require('@utils/setupDatabase');

// Starting server ~ Connect to mongo then start server
async function startServer() {
  console.log('Connecting to:', MONGODB_URI);
  setupDatabase();

  server.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT} in '${NODE_ENV}' mode`);
  });
}

startServer();
