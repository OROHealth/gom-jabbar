const moment = require("moment");
const R = require("ramda");

module.exports = class AuthLogic {
  constructor(MongoProvider, CaribError) {
    this.error = CaribError;
    this.mongoProvider = MongoProvider;
  }

  createAccessProfile({username, password}) {
    return this.mongoProvider((AccessProfile) => {
      const accessProfile = new AccessProfile({username, password});
      if (!RegExp(/.*carib@(.+){2,}\.(.+){2,}/).test(username)) {
        throw new this.error(409);
      }
      return accessProfile.save();
    });
  }

  getAccessProfile(accessToken) {
    return this.mongoProvider((Token) => {
      return Token.findOne({value: accessToken})
        .populate("accessProfile")
        .then((res) => {
          const accessProfile = R.path(["_doc", "accessProfile", "_doc"], res);
          if (!accessProfile) {
            throw new this.error(401);
          }
          return accessProfile;
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
