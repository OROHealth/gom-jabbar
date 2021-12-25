const { isUUID, generateUuidV4 } = require('../helpers/helpers')
const tableName = 'orders'

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Order', {
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
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isAfter: { args: (new Date()).toString(), msg: 'the reservation date must be later' },
        isDate: { args: true, msg: 'the order_date field must be a date format' }
      }
    },
    tone: {
      type: DataTypes.ENUM(['angry', 'happy', 'overhelmed', 'pregnant', 'moody', 'bored', 'excited']),
      allowNull: false,
      validate: {
        isIn: { args: [['angry', 'happy', 'overhelmed', 'pregnant', 'moody', 'bored', 'excited']], msg: 'The order tone must match one of requested' }
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
