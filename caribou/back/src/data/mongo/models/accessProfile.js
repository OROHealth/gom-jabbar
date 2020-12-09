const uuid = require("uuid");

module.exports = (Mongo, Tools) => {
  const AccessProfileSchema = new Mongo.Schema({
    uuid: { type: String, default: uuid.v4 },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String },
    salt: { type: String },
  }, {timestamps: true});

  AccessProfileSchema.pre("save", function(next) {
    const accessProfile = this;
    if (!accessProfile.isModified("password")) return next();

    if (accessProfile.password) {
      const salt = Tools.generateSalt();
      accessProfile.salt = salt;
      accessProfile.password = Tools.hashPassword(accessProfile.password, salt);
    }
    next();
  });

  AccessProfileSchema.methods.validatePassword = function(candidatePassword) {
    const candidateHash = Tools.hashPassword(candidatePassword, this.salt);
    return candidateHash === this.password;
  };

  const modelName = "AccessProfile";
  return {
    name: modelName,
    model: Mongo.model(modelName, AccessProfileSchema)
  };
};
