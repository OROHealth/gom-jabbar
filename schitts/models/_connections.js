module.exports = (db) => {
  try {
  // The model will now be available in models under the class name
  // Product 1 To n Review
  /*
  * The possible choices are NO ACTION, CASCADE, NO ACTION, SET DEFAULT and SET NULL.
  * as the documentation said, the relationship name must be pluralized and not in capitals letters, if
  * we want to rename relationShip we must begin by a Capital Letter
  */

    db.Product.hasMany(db.Review, { as: 'Reviews' }) // default reviews | custom : Rev | Revs | Reviewxx
    db.Review.belongsTo(db.Product, { as: 'Product' })

    db.Customer.hasMany(db.Order, { as: 'Orders' })

    db.Order.belongsTo(db.Customer, { as: 'Customer', onDelete: 'SET NULL', onUpdate: 'NO ACTION' })

    db.Dish.belongsToMany(db.Order, { through: db.DishOrder, as: 'Orders', onDelete: 'SET NULL', onUpdate: 'NO ACTION' })
    db.Order.belongsToMany(db.Dish, { through: db.DishOrder, as: 'Dishes', onDelete: 'SET NULL', onUpdate: 'NO ACTION' })

    db.Customer.hasMany(db.Booking, { as: 'Bookings' })
    db.Booking.belongsTo(db.Customer, { as: 'Customer' })

    db.Customer.belongsToMany(db.Dish, { through: db.CustomerDish, as: 'Dishes' })
    db.Dish.belongsToMany(db.Customer, { through: db.CustomerDish, as: 'Customers' })
  } catch (err) {
    console.log(err)
  }
}
