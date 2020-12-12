const bodyParser = require("body-parser");
const cors = require('cors');
const P = require("bluebird");
const express = require("express");
const cookieParser = require("cookie-parser");

const {removePrivateProperties} = require("../tools");

class Server {
  constructor(container) {
    this.container = container;
  }

  init({port, allowedCorsOrigins}) {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.port = port;
    this.app.use(cors({
      origin: allowedCorsOrigins,
      credentials: true
    }));
    this.authenticationMethods = {};
  };

  start() {
    this.app.listen(this.port, () => console.log(`HTTP server running on port ${this.port}`));
  }

  registerAuthenticationMethod(methodName, method) {
    this.authenticationMethods[methodName] = method;
  }

  registerRoute(options) {
    const {method, path, handler, addCookie, authenticationMethod} = options;
    return this.app[method.toLowerCase()](path, (req, res) => {
      console.log("Incoming request", removePrivateProperties({method, path, body: req.body, params: req.params, query: req.query}));
      const requestContainer = this.container.createChild();
      requestContainer.registerValue("Cookies", req.cookies);
      requestContainer.registerValue("Body", req.body);
      requestContainer.registerValue("Query", req.query);
      requestContainer.registerValue("Params", req.params);
      requestContainer.registerValue("Headers", req.headers);
      requestContainer.registerValue("SetCookie", (name, value, options) => res.cookie(name, value, options));
      requestContainer.registerValue("SetHeader", (name, value) => res.header(name, value));
      return P.resolve()
        .then(() => {
          if (authenticationMethod) {
            return requestContainer.inject(this.authenticationMethods[authenticationMethod])();
          }
        })
        .then(() => requestContainer.inject(handler)())
        .then((result) => res.send(result))
        .catch((error) => {
          if (error.constructor.name === "CaribError") {
            return res.status(error.statusCode).send();
          }
          console.error(error);
          return res.status(500).send();
        })
    });
  };
}

module.exports = Server;
