const { isUUID, generateUuidV4 } = require('../helpers/helpers')
const tableName = 'dishes_orders'

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('DishOrder', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      validate: {
        isNumeric: { args: true, msg: 'the quantity must be numeric' },
        min: { args: 1, msg: 'the quantity must be greater or equal then 1' }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { args: true, msg: 'the price must be a decimal' }
      }
    },
    over_cooked_level: {
      type: DataTypes.ENUM(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
      allowNull: false,
      defaultValue: 5,
      validate: {
        isIn: { args: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']], msg: 'The over cooked level must be greater than 1 and less than 10' }
      }
    }
  }, {
    tableName: tableName,
    timestamps: true,
    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    deletedAt: 'deleted_at',
    sequelize,
    paranoid: true // soft-deletion
  })

  return Model
}
