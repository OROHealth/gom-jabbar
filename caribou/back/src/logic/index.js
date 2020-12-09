const fs = require("fs");
const path = require("path");

const CaribError = class CaribError extends Error {
  constructor(statusCode) {
    super();
    this.statusCode = statusCode;
  }
};

module.exports = (Container) => {
  const technicalLogicsPath = path.join(__dirname, "technical");
  fs.existsSync(technicalLogicsPath) && fs.readdirSync(technicalLogicsPath).forEach((file) => {
    Container.registerFactory(require(path.join(technicalLogicsPath, file)));
  });
  const functionalLogicsPath = path.join(__dirname, "functional");
  fs.existsSync(functionalLogicsPath) && fs.readdirSync(functionalLogicsPath).forEach((file) => {
    Container.registerFactory(require(path.join(functionalLogicsPath, file)));
  });
  Container.registerValue("CaribError", CaribError);
};
