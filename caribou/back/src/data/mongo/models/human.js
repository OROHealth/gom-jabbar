const uuid = require("uuid");

module.exports = (Mongo) => {
  const HumanSchema = new Mongo.Schema({
    uuid: { type: String, default: uuid.v4 },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    trashingLevel: { type: Number, required: true },
    excitementLevel: { type: Number, required: true }
  }, {timestamps: true});

  const modelName = "Human";
  return {
    name: modelName,
    model: Mongo.model(modelName, HumanSchema)
  };
};
