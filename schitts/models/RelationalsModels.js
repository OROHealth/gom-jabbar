module.exports = (db) => {
  try {
  // The model will now be available in models under the class name
  // Product 1 To n Review
  /*
  * The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL.
  */
    db.Product.hasMany(db.Review, { as: 'reviews' })
    db.Review.belongsTo(db.Product, { as: 'product', foreignKey: 'product_id' })

    db.Customer.hasMany(db.Order, { as: 'orders' })
    db.Order.belongsTo(db.Customer, { as: 'customer', foreignKey: 'customer_id' })
    // db.Order.belongsTo(db.Customer, { as: 'customer', foreignKey: { allowNull: false, onDelete: 'SET NULL', onUpdate: 'RESTRICT' } })

    db.Dish.belongsToMany(db.Order, { through: db.OrderDish, foreignKey: { allowNull: false, onDelete: 'SET NULL', onUpdate: 'RESTRICT' } })
    db.Order.belongsToMany(db.Dish, { through: db.OrderDish, foreignKey: { allowNull: false, onDelete: 'SET NULL', onUpdate: 'RESTRICT' } })
  } catch (err) {
    console.log(err)
  }
}
