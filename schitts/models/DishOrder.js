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
