const {getDistance} = require("../../tools");

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

  getAll() {
    return this.mongoProvider((Human) => {
      return Human.find();
    });
  }

  checkSafety({lat, lng, radius}) {
    return this.mongoProvider((Human) => {
      return Human.find()
        .then((humans) => {
          let isNotSafe = false;
          humans.forEach((human) => {
            const distance = getDistance({lat, lng}, human)
            console.log(distance, radius);
            if (distance < Number(radius)) {
              isNotSafe = true;
            }
          });
          return {isNotSafe};
        })
    });
  }
};
