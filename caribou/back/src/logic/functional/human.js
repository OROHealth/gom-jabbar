module.exports = class HumanLogic {
  constructor(MongoProvider) {
    this.mongoProvider = MongoProvider;
  }

  register(humanData) {
    return this.mongoProvider((Human) => {
      const {lat, lng, excitementLevel, trashingLevel} = humanData;
      const human = new Human({lat, lng, excitementLevel, trashingLevel});
      return human.save();
    });
  }
};
