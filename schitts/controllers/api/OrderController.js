// autoload index.js
const db = require('../../models/_index')
const { consoleLog, isIterable } = require('../../helpers/helpers') // output into console regarding .env Log flag
const isNumber = require('../../helpers/helpers').isNumber
const log4js = require('../../config/log4js')
const log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
const path = require('path')
var validationError = {}
const Validator = require('Validator')
// create main Model
const Order = db.Order
const Customer = db.Customer
// Methods
/**
 * @route GET /api/v1/order
 * @description Fetch order
 * @summary summary
 * @return {array} status - responseDescription - responseContentType
 */
const index = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const offset = db.limit * (isNumber(req.query.page) ? req.query.page : 0)
  await Order.findAll({ include: { all: true, nested: true }, attributes: ['reference', 'order_date', 'tone', 'party_size', 'feedback', 'status', 'customers', 'CustomerId'], limit: db.limit, offset: offset }).then(
    (orders) => {
      responseObject.data = orders.pluck('dataValues')
      log.info(`Fetching orders. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 * @route POST /api/v1/order
 * @description Store new order
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
    order_date: req.body.order_date,
    CustomerId: req.body.CustomerId,
    tone: req.body.tone,
    customers: JSON.stringify(req.body.customers),
    feedback: req.body.feedback,
    status: req.body.status,
    party_size: isIterable(req.body.customers) ? req.body.customers.length : 0
  }

  // Apply validation here
  const rules = {
    order_date: 'required|date',
    CustomerId: 'required',
    tone: 'required|in:angry,happy,overhelmed,pregnant,moody,bored,excited',
    customers: 'required|array',
    feedback: 'required',
    status: 'required|in:PAID,UNPAID,REJECTED,ACCEPTED',
    party_size: 'required|numeric'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    'tone.in': 'The :attr must be one of the following types: :values',
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

      await Order.create(postData, { fields: ['order_date', 'reference', 'tone', 'CustomerId', 'customers', 'party_size'], transaction }).then(newly => {
        responseObject.data = newly.dataValues
        consoleLog(responseObject.data)
        log.info(`New order created. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        return res.status(201).json(responseObject)
      }).catch(err => { // SequelizeValidationError
        log.debug(`${err}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 *  @description Fetch specific order
 *  @route GET /api/v1/order/:customer_id
 */
const edit = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    const reference = req.params.reference
    await Order.findOne({ where: { reference: reference } }).then(
      (updated) => {
        if (updated === null) {
          throw new Error('order not found')
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
 * @route PATCH /api/v1/order/:reference
 * @description Update specific order
 * @param {string} reference - the order's reference
 */
const update = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const postData = {
    order_date: req.body.order_date,
    CustomerId: req.body.CustomerId,
    tone: req.body.tone,
    customers: JSON.stringify(req.body.customers),
    feedback: req.body.feedback,
    status: req.body.status,
    party_size: isIterable(req.body.customers) ? req.body.customers.length : 0
  }

  // Apply validation here
  const rules = {
    order_date: 'required|date',
    CustomerId: 'required',
    tone: 'required|in:angry,happy,overhelmed,pregnant,moody,bored,excited',
    customers: 'required|array',
    feedback: 'required',
    status: 'required|in:PAID,UNPAID,REJECTED,ACCEPTED'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    'tone.in': 'The :attr  must be one of the following types: :values',
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
    // check if customer already exists
    if (req.body.customer_id) {
      await Customer.findOne({ where: { reference: req.body.customer_id } }).then(
        (found) => {
          if (found === null) {
            throw new Error('customer not found')
          }
          postData.CustomerId = found.id
        }
      ).catch(error => {
        throw new Error(error)
      })
    }

    await db.sequelize.transaction(
      async (transaction) => {
        const reference = req.params.reference
        await Order.update(postData, { where: { reference: reference }, fields: ['order_date', 'tone', 'CustomerId', 'feedback', 'status', 'customers'], transaction }) // { fields: ['column_1', 'column_2',], where: { id: id } }
          .then(
            (updated) => {
              consoleLog(updated)
              log.info(`Order updated, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 *  @description Destroy specific order
 *  @route delete /api/v1/order/:reference
 */
const destroy = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const reference = req.params.reference
  await Order.destroy({ where: { reference: reference } }).then(
    (order) => {
      log.debug(order)
      if (order === 0) {
        log.debug(`Order not found, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        throw new Error('Order not found')
      }
      responseObject.msg = 'order successfully deleted'
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
