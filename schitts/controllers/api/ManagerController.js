// autoload index.js
const db = require('../../models/_index')
var consoleLog = require('../../helpers/helpers').consoleLog // output into console regarding .env Log flag
const log4js = require('../../config/log4js')
const log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
const path = require('path')
var validationError = {}
const { Op } = require('sequelize')
var moment = require('moment')
const Validator = require('Validator')
// create main Model
const Customer = db.Customer
const DishOrder = db.DishOrder
const Booking = db.Booking
const Order = db.Order
const Dish = db.Dish
const CustomerDish = db.CustomerDish
const Server = db.Server

/**
 * @route POST /api/v1/manager/booking
 * @description Store new booking
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const store = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const postData = {
    reservation_date: req.body.reservation_date,
    party_size: req.body.party_size,
    CustomerId: req.body.customer_id
  }

  // Apply validation here
  const rules = {
    reservation_date: 'required|date',
    reference: 'required',
    party_size: 'required|integer',
    CustomerId: 'required'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    type: ':attr doesn\'t match any of allowed one',
    // custom message for specific rule of attribute
    'receiver.email': 'The receiver email address is not valid'
  }

  const v = Validator.make(postData, rules, messages)

  if (v.fails()) {
    const errors = v.getErrors()
    responseObject.status = false
    // display first validation error
    responseObject.msg = (errors[Object.keys(errors)[0]])[0]

    return res.status(200).json(responseObject)
  }

  try {
    await db.sequelize.transaction(async (transaction) => {
      // check if favorite_dish already exists
      await Customer.findOne({ where: { reference: postData.CustomerId } }).then(
        (found) => {
          if (found === null) {
            throw new Error('customer not found')
          }
          postData.CustomerId = found.id
        }
      ).catch(error => {
        throw new Error(error)
      })

      await Booking.create(postData, { fields: ['reservation_date', 'reference', 'party_size', 'CustomerId'], transaction }).then(newBooking => {
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
      error.errors.forEach(er => {
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
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const postData = {
    reservation_date: req.body.reservation_date,
    party_size: req.body.party_size,
    CustomerId: req.body.customer_id
  }

  // Apply validation here
  const rules = {
    reservation_date: 'required|date',
    party_size: 'required|integer',
    CustomerId: 'required'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    type: ':attr doesn\'t match any of allowed one',
    // custom message for specific rule of attribute
    'receiver.email': 'The receiver email address is not valid'
  }

  const v = Validator.make(postData, rules, messages)

  if (v.fails()) {
    const errors = v.getErrors()
    responseObject.status = false
    // display first validation error
    responseObject.msg = (errors[Object.keys(errors)[0]])[0]

    return res.status(200).json(responseObject)
  }

  try {
    // check if favorite_dish already exists
    await Customer.findOne({ where: { reference: postData.CustomerId || 0 } }).then(
      (found) => {
        if (found === null) {
          throw new Error('customer not found')
        }
        postData.CustomerId = found.id
      }
    ).catch(error => {
      throw new Error(error)
    })

    await db.sequelize.transaction(
      async (transaction) => {
        const reference = req.params.reference
        await Booking.update(postData, { where: { reference: reference }, fields: ['reservation_date', 'CustomerId', 'party_size'], transaction }) // { fields: ['column_1', 'column_2',], where: { id: id } }
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
      err.errors.forEach(er => {
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
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const postData = {}
  postData.items = [...req.body]
  // Apply validation here
  const rules = {
    items: 'required|array'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    array: ':attr must be an array',
    email: ':attr is not valid',
    type: ':attr doesn\'t match any of allowed one',
    // custom message for specific rule of attribute
    'receiver.email': 'The receiver email address is not valid'
  }

  const v = Validator.make(postData, rules, messages)

  if (v.fails()) {
    const errors = v.getErrors()
    responseObject.status = false
    // display first validation error
    responseObject.msg = (errors[Object.keys(errors)[0]])[0]

    return res.status(200).json(responseObject)
  }

  try {
    await db.sequelize.transaction(async (transaction) => {
      var elts = []
      const customerDishes = []
      // make $items unique regarding DishId property
      const $items = ([...req.body]).makeUnique('DishId')
      $items.forEach(
        function (item, key) {
          elts.push({ ...item }.DishId)
        }
      )

      // get order
      const order = await Order.findOne({ where: { reference: req.params.reference } })
      if (order === null) throw new Error('Order not found')
      // get DishesId
      var dishIds
      await Dish.findAll({ where: { reference: elts } })
        .then((res) => { dishIds = res.pluck('dataValues') })
        .catch(error => {
          throw new Error(error)
        })
      elts = []
      $items.forEach(
        function (item, key) {
          const obj = { ...item } // { DishRef, quantity}
          const dish = dishIds.find(x => x.reference === obj.DishId)
          if (dish === undefined) throw new Error('One dish doesnt match our records: ' + obj.DishId)
          obj.DishId = dish.id
          obj.price = dish.price
          obj.OrderId = order.id
          obj.overCookedLevel = req.body.overCookedLevel
          elts.push(obj)
          const customerDishObj = { CustomerId: order.CustomerId, DishId: dish.id }
          customerDishes.push(customerDishObj)
        }
      )

      // check if favorite_dish already exists
      await DishOrder.bulkCreate(elts, { fields: ['OrderId', 'DishId', 'quantity', 'price', 'overCookedLevel'], transaction }).then(
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
      error.errors.forEach(er => {
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
 * @route POST /api/v1/manager/diagnose
 * @description Store new dishes ordered
 * @summary summary
 * @param {requestBodyType} request.body.serverName - the name of the server who handled order
 * @param {requestBodyType} request.body.overCookedLevel - the name of the server who handled order
 * @param {requestBodyType} request.body.month - the count previous months
 * @return {responseType} status - responseDescription - responseContentType
 */
const serverOverCookedDishes = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const { serverName, overCookedLevel, month } = req.body
  const postData = { serverName, overCookedLevel, month }

  // Apply validation here
  const rules = {
    serverName: 'required',
    overCookedLevel: 'required|integer|min:1|max:10',
    month: 'required|integer|min:1|max:12'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    array: ':attr must be an array',
    email: ':attr is not valid',
    type: ':attr doesn\'t match any of allowed one',
    // custom message for specific rule of attribute
    'receiver.email': 'The receiver email address is not valid'
  }

  const v = Validator.make(postData, rules, messages)

  if (v.fails()) {
    const errors = v.getErrors()
    responseObject.status = false
    // display first validation error
    responseObject.msg = (errors[Object.keys(errors)[0]])[0]

    return res.status(200).json(responseObject)
  }

  try {
    // find server_id regarding his name
    const server = await Server.findOne({ where: { [Op.or]: [{ first_name: { [Op.like]: serverName } }, { last_name: { [Op.like]: serverName } }] } })
      .then()
      .catch(error => {
        log.info(`Server not found. ServerName:${serverName}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        throw new Error(error)
      })
    if (server === null) throw new Error('Server not found')
    console.log(server)
    // find order_id regarding waiter or waitress
    var orders
    await Order.findAll({ where: { server: server.dataValues.id } })
      .then((results) => { orders = results.pluck('dataValues') })
      .catch(error => {
        throw new Error(error)
      })
    if (orders === null || orders === undefined) throw new Error('No matched orders were found.')

    const today = new Date()
    const currentMoment = moment(today.toDateString()).format('YYYY/MM/DD')
    const pastMoment = moment(today.setMonth(today.getMonth() - month)).format('YYYY/MM/DD')

    // find overCookedLevel corresponding to waitress or waiter
    const managedOrdersId = orders.pluck('id')
    var dishesOrdered
    await DishOrder.findAll({ field: ['id', 'quantity', 'price', 'overCookedLevel'], where: { OrderId: managedOrdersId, overCookedLevel: overCookedLevel, created_at: { [Op.between]: [pastMoment, currentMoment] } } }).then(
      (dishes) => {
        dishesOrdered = dishes.pluck('dataValues')
        log.info(`Dishes ordered found, count: ${dishes.length}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
      }
    ).catch(error => {
      throw new Error(error)
    })
    if (dishesOrdered === null || dishesOrdered === undefined) throw new Error('No ordered dishes were found.')

    if (dishesOrdered.length > 0) {
      const dishesCount = dishesOrdered.reduce(function (total, current) { total += current.quantity; return total }, 0)
      const amount = dishesOrdered.reduce(function (total, current) { total += current.quantity * current.price; return total }, 0)
      responseObject.data = { dishesCount, amount }
    }

    return res.status(201).json(responseObject)
  } catch (error) {
    if (error.name !== 'SequelizeValidationError') {
      validationError = error.message
    } else {
      error.errors.forEach(er => {
        validationError[er.path] = er.message
      })
    }
    log.error(`${error}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
    responseObject.error = validationError
    responseObject.status = false

    return res.status(400).json(responseObject)
  }
}

module.exports = {
  store,
  update,
  order,
  serverOverCookedDishes
}
