const { isUUID, generateUuidV4 } = require('../helpers/helpers')
const tableName = 'dishes'

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Dish', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'the name field must be provided' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'the description field must be provided' }
      }
    },
    reference: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4, // Three of the values provided here (NOW, UUIDV1 and UUIDV4) are special default values, that should not be used to define types.
      /* set (value) {
        this.setDataValue('reference', (value) => { return 'value' + 'hello' })
      }, */
      validate: {
        notNull: false,
        notEmpty: false,
        isUUID: (value) => isUUID(value)
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { args: true, msg: 'the price must be a decimal' },
      }
    }
  }, {
    hooks: {
      beforeCreate: () => {
        this.reference = generateUuidV4()
      }
    },
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
