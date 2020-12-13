module.exports = class CaribouLogic {
  constructor(MongoProvider) {
    this.mongoProvider = MongoProvider;
  }

  register(caribouData) {
    return this.mongoProvider((Caribou) => {
      const {lat, lng} = caribouData;
      const caribou = new Caribou({lat, lng});
      return caribou.save();
    });
  }
};
