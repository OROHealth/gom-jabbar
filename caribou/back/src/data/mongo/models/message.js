const uuid = require("uuid");

module.exports = (Mongo) => {
  const MessageSchema = new Mongo.Schema({
    uuid: { type: String, default: uuid.v4 },
    content: { type: String, required: true },
    room: { type: String, required: true },
    accessProfile: { type: Mongo.Schema.Types.ObjectId, ref: 'AccessProfile' }
  }, {timestamps: true});

  const modelName = "Message";
  return {
    name: modelName,
    model: Mongo.model(modelName, MessageSchema)
  };
};
