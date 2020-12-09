const moment = require("moment");
const uuid = require("uuid");

module.exports = (Mongo, Tools) => {
  const TokenSchema = new Mongo.Schema({
    uuid: { type: String, default: uuid.v4 },
    type: { type: String, required: true },
    value: { type: String },
    expirationDate: { type: Date },
    accessProfile: { type: Mongo.Schema.Types.ObjectId, ref: 'AccessProfile' }
  }, {timestamps: true});

  TokenSchema.pre("save", function(next) {
    const token = this;
    token.value = Tools.generateToken();
    token.expirationDate = moment().add({hour: 1});
    next();
  });

  const modelName = "Token";
  return {
    name: modelName,
    model: Mongo.model(modelName, TokenSchema)
  };
};
