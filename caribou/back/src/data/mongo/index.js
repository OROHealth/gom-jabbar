const fs = require("fs");
const mongoose = require('mongoose');
const path = require("path");

module.exports = (Container, Configuration) => {
  const dataContainer = Container.createChild();
  dataContainer.registerValue("Mongo", mongoose);
  dataContainer.registerValue("Configuration", Configuration);

  const mongoUrl = `mongodb://${Configuration.user}:${Configuration.password}@${Configuration.host}:${Configuration.port}/${Configuration.database}`;
  mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

  const modelsPath = path.join(__dirname, "models");
  fs.existsSync(modelsPath) && fs.readdirSync(modelsPath).forEach((file) => {
    const {name, model} = dataContainer.inject(require(path.join(modelsPath, file)))();
    dataContainer.registerValue(`${Configuration.modelPrefix}${name}`, model);
  });

  Container.registerValue("MongoProvider", (f) => {
    return dataContainer.inject(f)();
  });
};
