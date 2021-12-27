const { isUUID, generateUuidV4, isIterable } = require('../helpers/helpers')
const log4js = require('../config/log4js')
var log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
var path = require('path')
const tableName = 'orders'
const Arr = JSON.stringify([])

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
        isAfter: { args: (new Date(new Date().setHours(0, 0, 0, 0))).toString(), msg: 'the order date date must be later' },
        isDate: { args: true, msg: 'the order_date field must be a date format' }
      }
    },
    tone: {
      type: DataTypes.ENUM(['angry', 'happy', 'overhelmed', 'pregnant', 'moody', 'bored', 'excited']),
      allowNull: false,
      validate: {
        isIn: { args: [['angry', 'happy', 'overhelmed', 'pregnant', 'moody', 'bored', 'excited']], msg: 'The order tone must match one of requested' }
      }
    },
    party_size: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: 'the party_size must be an integer' }
      }
    },
    customers: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: Arr,
      validate: {
        isArray (value) {
          if (!isIterable(JSON.parse(value))) {
            log.info(`New order created. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
            throw new Error('Only array of values are allowed!')
          }
        }
      }
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(['PAID', 'UNPAID', 'REJECTED', 'ACCEPTED']),
      allowNull: true,
      defaultValue: 'ACCEPTED'
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
