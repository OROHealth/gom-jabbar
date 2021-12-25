const { isUUID, generateUuidV4 } = require('../helpers/helpers')
const tableName = 'bookings'

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Booking', {
    party_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
    reservation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isAfter: { args: (new Date()).toString(), msg: 'the reservation date must be later' },
        isDate: { args: true, msg: 'the reservation date must be a date format' }
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
