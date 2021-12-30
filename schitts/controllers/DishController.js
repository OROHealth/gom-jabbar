// autoload index.js
const db = require('../models/_index')
const { consoleLog } = require('../helpers/helpers') // output into console regarding .env Log flag
var isNumber = require('../helpers/helpers').isNumber
const log4js = require('../config/log4js')
var log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
var path = require('path')
var validationError = {}
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
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const offset = db.limit * (isNumber(req.query.page) ? req.query.page : 0)
  await Dish.findAll({ include: { all: true, nested: true }, attributes: ['reference', 'name', 'description', 'price', 'last_preparation_date', 'conservation_time', 'type', 'active'], limit: db.limit, offset: offset }).then(
    (dishes) => {
      responseObject.data = dishes
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
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    await db.sequelize.transaction(async (transaction) => {
      const info = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        over_cooked_level: req.body.over_cooked_level,
        conservation_time: req.body.conservation_time,
        last_preparation_date: req.body.last_preparation_date,
        active: req.body.active
      }

      await Dish.create(info, { fields: ['name', 'reference', 'description', 'price', 'last_preparation_date', 'conservation_time', 'type', 'active'], transaction }).then(newly => {
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
 *  @description Fetch specific dish
 *  @route GET /api/v1/dish/:customer_id
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
  var responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    await db.sequelize.transaction(
      async (transaction) => {
        const reference = req.params.reference
        await Dish.update(req.body, { where: { reference: reference }, fields: ['name', 'description', 'price', 'over_cooked_level', 'last_preparation_date', 'conservation_time', 'type', 'active'], transaction }) // { fields: ['column_1', 'column_2',], where: { id: id } }
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
 *  @description Destroy specific dish
 *  @route delete /api/v1/dish/:reference
 */
const destroy = async (req, res) => {
  var responseObject = {
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
