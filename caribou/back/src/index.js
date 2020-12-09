const dotenv = require("dotenv");

const path = require("path");
const piquouze = require("piquouze");

const configuration = require("../config");
const tools = require("./tools");

dotenv.config();

const container = new piquouze.Container();
container.registerValue("Container", container);

const extractLayerConfiguration = (layer) => {
  let layerConfig = configuration;
  layer.forEach((subLayer) => {
    layerConfig = layerConfig[subLayer];
  });
  return layerConfig;
};

configuration.layers.forEach((layer) => {
  const layerPath = path.join(__dirname, ...layer);
  container.registerValue("Tools", tools);
  const layerContainer = container.createChild();
  layerContainer.registerValue("Configuration", extractLayerConfiguration(layer));
  layerContainer.inject(require(layerPath))();
});
