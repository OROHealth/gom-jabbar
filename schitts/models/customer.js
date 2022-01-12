module.exports = class Customer {
  constructor(name, type, preferredDrinkId, preferredFoodId) {
    this.name = name;
    this.type = type;
    this.preferredDrinkId = preferredDrinkId;
    this.preferredFoodId = preferredFoodId;
  }

  updatePreferredDrinkId(preferredDrinkId) {
    this.preferredDrinkId = preferredDrinkId;
  }

  updatePreferredFoodId(preferredFoodId) {
    this.preferredFoodId = preferredFoodId;
  }
};
