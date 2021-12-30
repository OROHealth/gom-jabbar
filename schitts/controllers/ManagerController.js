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
const DishOrder = db.DishOrder
const Booking = db.Booking
const Order = db.Order
const Dish = db.Dish
const CustomerDish = db.CustomerDish

/**
 * @route POST /api/v1/manager/booking
 * @description Store new booking
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
        reservation_date: req.body.reservation_date,
        party_size: req.body.party_size,
        CustomerId: req.body.customer_id
      }

      // check if favorite_dish already exists
      await Customer.findOne({ where: { reference: info.CustomerId } }).then(
        (found) => {
          if (found === null) {
            throw new Error('customer not found')
          }
          info.CustomerId = found.id
        }
      ).catch(error => {
        throw new Error(error)
      })

      await Booking.create(info, { fields: ['reservation_date', 'reference', 'party_size', 'CustomerId'], transaction }).then(newBooking => {
        responseObject.data = newBooking.dataValues
        consoleLog(responseObject.data)
        log.info(`New booking created. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 * @route PATCH /api/v1/manager/booking/{reference}:
 * @description Update specific customer booking
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
    await Customer.findOne({ where: { reference: req.body.customer_id || 0 } }).then(
      (found) => {
        if (found === null) {
          throw new Error('customer not found')
        }
        req.body.customer_id = found.id
      }
    ).catch(error => {
      throw new Error(error)
    })

    await db.sequelize.transaction(
      async (transaction) => {
        const reference = req.params.reference
        await Booking.update(req.body, { where: { reference: reference }, fields: ['reservation_date', 'CustomerId', 'party_size'], transaction }) // { fields: ['column_1', 'column_2',], where: { id: id } }
          .then(
            (updated) => {
              consoleLog(updated)
              log.info(`Booking updated, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 * @route POST /api/v1/manager/booking
 * @description Store new dishes ordered
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const order = async (req, res) => {
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    await db.sequelize.transaction(async (transaction) => {
      var elts = []
      const customerDishes = []
      // make $items unique regarding DishId property
      const $items = ([...req.body]).makeUnique('DishId')
      $items.map(
        function (item, key) {
          elts.push({ ...item }.DishId)
        }
      )

      // get order
      const order = await Order.findOne({ where: { reference: req.params.reference } })
      if (order === null) throw new Error('Order not found')
      // get DishesId
      const dishIds = await Dish.findAll({ where: { reference: elts } })
      elts = []
      $items.map(
        function (item, key) {
          const obj = { ...item } // { DishRef, quantity}
          const dish = dishIds.find(x => x.reference === obj.DishId)
          if (dish === undefined) throw new Error('One dish doesnt match our records: ' + obj.DishId)
          obj.DishId = dish.id
          obj.price = dish.price
          obj.OrderId = order.id
          obj.over_cooked_level = req.body.over_cooked_level
          elts.push(obj)
          const customerDishObj = { CustomerId: order.CustomerId, DishId: dish.id }
          customerDishes.push(customerDishObj)
        }
      )

      // check if favorite_dish already exists
      await DishOrder.bulkCreate(elts, { fields: ['OrderId', 'DishId', 'quantity', 'price', 'over_cooked_level'], transaction }).then(
        (inserted) => {
          log.info(`DishOrder inserted, count: ${inserted.length}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        }
      ).catch(error => {
        throw new Error(error)
      })

      await CustomerDish.bulkCreate(customerDishes, { fields: ['CustomerId', 'DishId'], transaction }).then(inserted => {
        responseObject.data = 1
        log.info(`CustomerDishes inserted, count: ${inserted.length} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 * @route POST /api/v1/manager/{is_server}/overcooked
 * @description Store new dishes ordered
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const serverOverCookedDishes = async (req, res) => {
  /* var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  } */
  chercher dans dishes_orders where over_cooked_level == 8 and orderId = 'id de serveur dont le nom est parametré', 
  faire le [decompte des lignes résultantes et établir le montant en argent] 
}

module.exports = {
  store,
  update,
  order
}
