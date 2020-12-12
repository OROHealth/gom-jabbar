const fs = require("fs");
const path = require("path");

const Server = require("./server");
const SocketServer = require("./socket");

const OAuthMethod = (Container, AuthLogic, Cookies) => {
  return AuthLogic.getAccessProfile(Cookies.access_token)
    .then((credentials) => {
      Container.registerValue("Credentials", credentials);
      return credentials;
    });
};

module.exports = (Container, Configuration) => {
  Configuration.allowedCorsOrigins = process.env.CARIB__ACCEPTED_CORS_ORIGINS.split(",");
  Container.registerValue("Configuration", Configuration);
  Container.registerValue("Server", new Server(Container));
  Container.inject((Server) => Server.init(Configuration))();
  Container.registerValue("SocketServer", new SocketServer(Container));
  Container.inject((SocketServer) => SocketServer.init(Configuration))();

  Container.inject((Server) => Server.registerAuthenticationMethod("OAuth", OAuthMethod))();
  Container.inject((SocketServer) => SocketServer.registerAuthenticationMethod("OAuth", OAuthMethod))();

  const controllersPath = path.join(__dirname, "controllers");
  fs.existsSync(controllersPath) && fs.readdirSync(controllersPath).forEach((file) => {
    Container.inject(require(path.join(controllersPath, file)))();
  });
  Container.inject((Server) => Server.start())();
  Container.inject((SocketServer) => SocketServer.start())();
};
