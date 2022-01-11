module.exports = class MenuItem {
    constructor(name, price, acceptableOverCookedness, fridgeLife, isDrink) {
        this.name = name;
        this.price = price;
        this.acceptableOverCookedness = acceptableOverCookedness;
        this.fridgeLife = fridgeLife;
        this.isDrink = isDrink;
    }
}