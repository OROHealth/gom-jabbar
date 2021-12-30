const { isUUID, generateUuidV4 } = require('../helpers/helpers')
const tableName = 'customers'

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Customer', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: false,
        notEmpty: false,
        isEmail: { args: true, msg: 'The email is not in correct format' }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: { args: /\+\d{3}\s\d{9,}$/i, msg: 'This phone number is not valid' }
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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notNull: false,
        notEmpty: { args: true, msg: 'Address field must be provided' }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notNull: false,
        notEmpty: { args: true, msg: 'City field must be provided' }
      }
    },
    favorite_food: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'dishes', // refers to table name
        key: 'id' // 'id' refers to column name in current table
      },
      validate: {
        isInt: { args: true, msg: 'the favorite drink must be numeric' }
      }
    },
    favorite_drink: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'dishes', // 'fathers' refers to table name
        key: 'id' // 'id' refers to column name in fathers table
      },
      validate: {
        isInt: { args: true, msg: 'the favorite drink must be numeric' }
      }
    },
    bill_split: {
      type: DataTypes.ENUM(['PER GROUP', 'PER PERSON', 'WITH RATIOS']),
      allowNull: true,
      defaultValue: 'PER GROUP',
      validate: {
        isIn: { args: [['PER GROUP', 'PER PERSON', 'WITH RATIOS']], msg: 'the split of the bill must be one of the specified value' }
      }
    },
    type: {
      type: DataTypes.ENUM(['OUT OF TOWN', 'IN TOWN', 'PART OF THE ROSE FAMILY']),
      allowNull: false,
      dafaultValue: 'OUT OF TIME',
      validate: {
        isIn: { args: [['OUT OF TOWN', 'IN TOWN', 'PART OF THE ROSE FAMILY']], msg: 'the type of customer must be one of the specified value' }
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
