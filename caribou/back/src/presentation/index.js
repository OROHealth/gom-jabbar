const fs = require("fs");
const path = require("path");

const Server = require("./server");

module.exports = (Container, Configuration) => {
  Configuration.allowedCorsOrigins = process.env.CARIB__ACCEPTED_CORS_ORIGINS.split(",");
  Container.registerValue("Configuration", Configuration);
  Container.registerValue("Server", new Server(Container));
  Container.inject((Server) => Server.init(Configuration))();

  Container.inject((Server) => Server.registerAuthenticationMethod(
    "OAuth",
    (AuthLogic, Cookies) => {
      return AuthLogic.getAccessProfile(Cookies.access_token)
        .then((credentials) => {
          Container.registerValue("Credentials", credentials);
          return credentials;
        });
    }
  ))();

  const controllersPath = path.join(__dirname, "controllers");
  fs.existsSync(controllersPath) && fs.readdirSync(controllersPath).forEach((file) => {
    Container.inject(require(path.join(controllersPath, file)))();
  });
  Container.inject((Server) => Server.start())();
};
