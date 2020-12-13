const cookie = require("cookie");
const cors = require("cors");
const http = require("http");
const express = require("express");
const P = require("bluebird");
const R = require("ramda");
const socketio = require("socket.io");

const {removePrivateProperties} = require("../tools");

class SocketServer {
  constructor(container) {
    this.container = container;
  }

  init({socketPort, allowedCorsOrigins}) {
    this.port = socketPort;
    this.app = express();
    this.server =  http.createServer(this.app);
    this.io = socketio(this.server);
    this.app.use(cors({
      origin: allowedCorsOrigins,
      credentials: true
    }));
    this.authenticationMethods = {};
  }

  registerAuthenticationMethod(methodName, method) {
    this.authenticationMethods[methodName] = method;
  }

  registerSocketEvent({eventName, handler, authenticationMethod}) {
    this.io.on('connect', (socket) => {
      socket.on(eventName, (data, callback) => {
        console.log("Incoming socket event", removePrivateProperties({eventName, data}));
        const socketContainer = this.container.createChild();
        socketContainer.registerValue("Cookies", cookie.parse(R.path(["handshake", "headers", "cookie"], socket)));
        socketContainer.registerValue("Socket", socket);
        socketContainer.registerValue("IO", this.io);
        socketContainer.registerValue("Data", data);
        socketContainer.registerValue("Callback", callback || (() => null));
        return P.resolve()
          .then(() => {
            if (authenticationMethod) {
              return socketContainer.inject(this.authenticationMethods[authenticationMethod])();
            }
          })
          .then(() => socketContainer.inject(handler)());
      });
    });
  }

  start() {
    this.server.listen(this.port, () => console.log(`Socket server running on port ${this.port}`));
  }
}

module.exports = SocketServer;
