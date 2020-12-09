const moment = require("moment");

module.exports = class AuthLogic {
  constructor(MongoProvider, CaribError) {
    this.error = CaribError;
    this.mongoProvider = MongoProvider;
  }

  createAccessProfile({username, password}) {
    return this.mongoProvider((AccessProfile) => {
      const accessProfile = new AccessProfile({username, password});
      if (username.indexOf("carib") === -1) {
        throw new this.error(409);
      }
      return accessProfile.save();
    });
  }

  getAccessProfile(accessToken) {
    return this.mongoProvider((Token) => {
      return Token.findOne({value: accessToken})
        .then((res) => {
          if (!res) {
            throw new this.error(401);
          }
          return res.accessProfile;
        })
    });
  }

  processOAuth({externalAccessToken, username, password, grant_type}, strategy) {
    if (strategy === "login") {
      return this.getAccessToken({username, password, grant_type});
    }
  }

  getAccessToken({username, password, grant_type}) {
    return this.mongoProvider((AccessProfile, Token) => {
      if (grant_type === "password") {
        return AccessProfile.findOne({username})
          .then((accessProfile) => {
            if (!accessProfile || !accessProfile.validatePassword(password)) {
              throw new this.error(404);
            }
            const accessToken = new Token({type: "ACCESS_TOKEN", accessProfile: accessProfile._id});
            return accessToken.save()
              .then((token) => ({
                token_type: "Bearer",
                access_token: token.value,
                expires_in: Math.round(moment(token.expirationDate).diff(moment()) / 1000)
              }));
          });
      }
      throw new this.error(401);
    });
  }
};
