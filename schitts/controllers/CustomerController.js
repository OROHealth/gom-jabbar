// autoload index.js
const db = require('../models/_index')
var consoleLog = require('../helpers/helpers').consoleLog // output into console regarding .env Log flag
var isNumber = require('../helpers/helpers').isNumber
const log4js = require('../config/log4js')
var log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
var path = require('path')
var validationError = {}
// create main Model
const Customer = db.Customer
const Dish = db.Dish
const Order = db.Order
const Booking = db.Booking
// Methods
/**
 * @route GET /api/v1/customer
 * @description Fetch customer
 * @summary summary
 * @return {array} status - responseDescription - responseContentType
 */
const index = async (req, res) => {
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const offset = db.limit * (isNumber(req.query.page) ? req.query.page : 0)
  await Customer.findAll({ include: [{ model: Dish, require: false, as: 'Dishes' }, { model: Order, require: false, as: 'Orders' }, { model: Booking, require: false, as: 'Bookings' }], attributes: ['first_name', 'last_name', 'email', 'reference', 'phone_number', 'address', 'city', 'favorite_dish'], limit: db.limit, offset: offset }).then(
    (customers) => {
      responseObject.data = customers
      log.info(`Fetching customers. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
      res.status(200).json(responseObject)
    }
  ).catch(err => {
    consoleLog(err)
    log.error(`${err}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
    responseObject.error = err.message
    responseObject.status = false
    res.status(400).json(responseObject)
  })
}

/**
 * @route POST /api/v1/customer
 * @description Store new product
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const store = async (req, res) => {
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    await db.sequelize.transaction(async (transaction) => {
      const info = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        reference: req.body.reference,
        email: req.body.email,
        phone_number: req.body.phone_number,
        address: req.body.address,
        city: req.body.city,
        favorite_dish: req.body.favorite_dish
      }

      // check if favorite_dish already exists
      await Dish.findOne({ where: { reference: info.favorite_dish } }).then(
        (found) => {
          if (found === null) {
            throw new Error('dish not found')
          }
          info.favorite_dish = found.id
        }
      ).catch(error => {
        throw new Error(error)
      })

      await Customer.create(info, { fields: ['first_name', 'last_name', 'email', 'phone_number', 'address', 'city', 'favorite_dish'], transaction }).then(newCustomer => {
        responseObject.data = newCustomer.dataValues
        consoleLog(responseObject.data)
        log.info(`New customer created. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        return res.status(201).json(responseObject)
      }).catch(err => { // SequelizeValidationError
        throw (err)
      })
    })
  } catch (error) {
    if (error.name !== 'SequelizeValidationError') {
      validationError = error.message
    } else {
      error.errors.map(er => {
        validationError[er.path] = er.message
      })
    }
    log.error(`${error}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)

    responseObject.error = validationError
    responseObject.status = false

    return res.status(400).json(responseObject)
  }
}

/**
 *  @description Fetch specific customer
 *  @route GET /api/v1/customer/:customer_id
 */
const edit = async (req, res) => {
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    const reference = req.params.reference
    await Customer.findOne({ where: { reference: reference }, include: [{ model: Dish, require: false, as: 'Dishes' }, { model: Order, require: false, as: 'Orders' }, { model: Booking, require: false, as: 'Bookings' }] }).then(
      (updated) => {
        if (updated === null) {
          throw new Error('customer not found')
        }
        responseObject.data = updated.dataValues
        return res.status(200).json(responseObject)
      }
    ).catch(error => {
      throw new Error(error)
    })
  } catch (error) {
    log.error(`${error}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
    responseObject.status = false
    responseObject.error = error.message
    return res.status(400).json(responseObject)
  }
}

/**
 * @route PATCH /api/v1/customer/:customer_id
 * @description Update specific customer
 * @param {string} first_name - the customer's first name
 * @param {string} last_name - the customer's last name
 * @param {string} phone_number - the customer's phone number
 */
const update = async (req, res) => {
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    // check if favorite_dish already exists
    await Dish.findOne({ where: { reference: req.body.favorite_dish || 0 } }).then(
      (found) => {
        if (found === null) {
          throw new Error('dish not found')
        }
        req.body.favorite_dish = found.id
      }
    ).catch(error => {
      throw new Error(error)
    })

    await db.sequelize.transaction(
      async (transaction) => {
        const reference = req.params.reference
        await Customer.update(req.body, { where: { reference: reference }, fields: ['first_name', 'last_name', 'phone_number', 'address', 'city', 'favorite_dish'], transaction }) // { fields: ['column_1', 'column_2',], where: { id: id } }
          .then(
            (updated) => {
              consoleLog(updated)
              log.info(`Product updated, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
              responseObject.data = updated
              res.status(200).json(responseObject)
            }
          ).catch(error => {
            throw error
          })
      })
  } catch (err) {
    if (err.name !== 'SequelizeValidationError') {
      validationError = err.message
    } else {
      err.errors.map(er => {
        validationError[er.path] = er.message
      })
    }
    log.error(`${err}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
    consoleLog(err)
    responseObject.error = validationError
    responseObject.status = false

    res.status(400).json(responseObject)
  }
}

/**
 *  @description Destroy specific product
 *  @route delete /api/v1/product/:product_id
 */
const destroy = async (req, res) => {
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const reference = req.params.reference
  await Customer.destroy({ where: { reference: reference } }).then(
    (result) => {
      if (result === 0) {
        log.debug(`Customer not found, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        throw new Error('Customer not found')
      }
      responseObject.msg = 'customer successfully deleted'
      res.status(200).json(responseObject)
    }
  ).catch(err => {
    log.debug(`${err}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
    responseObject.status = false
    res.status(400).json(responseObject)
  })
}

module.exports = {
  index,
  store,
  edit,
  update,
  destroy
}
