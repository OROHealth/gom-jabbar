// autoload index.js
const db = require('../../models/_index')
const { consoleLog } = require('../../helpers/helpers') // output into console regarding .env Log flag
var isNumber = require('../../helpers/helpers').isNumber
const log4js = require('../../config/log4js')
var log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
var path = require('path')
var validationError = {}
const Validator = require('Validator')
// create main Model
const Dish = db.Dish
// Methods
/**
 * @route GET /api/v1/dish
 * @description Fetch dish
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
  await Dish.findAll({ include: { all: true, nested: true }, attributes: ['reference', 'name', 'description', 'price', 'last_preparation_date', 'conservation_time', 'type', 'active'], limit: db.limit, offset: offset }).then(
    (dishes) => {
      responseObject.data = dishes.pluck('dataValues')
      log.info(`Fetching dishes. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 * @route POST /api/v1/dish
 * @description Store new dish
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

  try {
    await db.sequelize.transaction(async (transaction) => {
      const postData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        conservation_time: req.body.conservation_time,
        last_preparation_date: req.body.last_preparation_date,
        active: req.body.active
      }

      // Apply validation here
      const rules = {
        name: 'required',
        description: 'required',
        price: 'required|numeric',
        conservation_time: 'required|integer',
        last_preparation_date: 'required|date',
        active: 'required|digit|min:0|max:1'
      }

      const messages = {
        // custom message for based rules
        required: 'You forgot the :attr field',
        email: ':attr is not valid',
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

      await Dish.create(postData, { fields: ['name', 'reference', 'description', 'price', 'last_preparation_date', 'conservation_time', 'type', 'active'], transaction }).then(newly => {
        responseObject.data = newly.dataValues
        consoleLog(responseObject.data)
        log.info(`New dish created. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 *  @description Fetch specific dish
 *  @route GET /api/v1/dish/:customer_id
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
    await Dish.findOne({ where: { reference: reference } }).then(
      (updated) => {
        if (updated === null) {
          throw new Error('dish not found')
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
 * @route PATCH /api/v1/dish/:reference
 * @description Update specific dish
 * @param {string} reference - the dish's reference
 */
const update = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const postData = req.body
  // Apply validation here
  const rules = {
    name: 'required',
    description: 'required',
    price: 'required|numeric',
    conservation_time: 'required|integer',
    last_preparation_date: 'required|date',
    active: 'required|digit|min:0|max:1',
    type: 'required|in:FOOD,DRINK'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    'type.in': 'The :attr  must be one of the following types: :values',
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
    await db.sequelize.transaction(
      async (transaction) => {
        const reference = req.params.reference
        await Dish.update(postData, { where: { reference: reference }, fields: ['name', 'description', 'price', 'last_preparation_date', 'conservation_time', 'type', 'active'], transaction }) // { fields: ['column_1', 'column_2',], where: { id: id } }
          .then(
            (updated) => {
              consoleLog(updated)
              log.info(`Dish updated, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 *  @description Destroy specific dish
 *  @route delete /api/v1/dish/:reference
 */
const destroy = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const reference = req.params.reference
  await Dish.destroy({ where: { reference: reference } }).then(
    (dish) => {
      if (dish === 0) {
        log.debug(`Order not found, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        throw new Error('Order not found')
      }
      responseObject.msg = 'dish successfully deleted'
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
