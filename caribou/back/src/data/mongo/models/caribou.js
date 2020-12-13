const uuid = require("uuid");

module.exports = (Mongo) => {
  const CaribouSchema = new Mongo.Schema({
    uuid: { type: String, default: uuid.v4 },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }, {timestamps: true});

  const modelName = "Caribou";
  return {
    name: modelName,
    model: Mongo.model(modelName, CaribouSchema)
  };
};
