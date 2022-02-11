// autoload index.js
const db = require('../../models/_index')
const consoleLog = require('../../helpers/helpers').consoleLog // output into console regarding .env Log flag
const isNumber = require('../../helpers/helpers').isNumber
const log4js = require('../../config/log4js')
const log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
const path = require('path')
var validationError = {}
const Validator = require('Validator')
// create main Model
const Product = db.Product

// Methods
/**
 * @route GET /api/v1/product
 * @description Fetch products
 * @summary summary
 * @param {paramType} paramId.paramType - paramDescription
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const index = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const offset = db.limit * (isNumber(req.query.page) ? req.query.page : 0)
  await Product.findAll({ attributes: ['id', 'reference', 'title', 'price', 'description', 'published'], include: { model: db.Review, as: 'Reviews', foreignKey: 'product_id' }, limit: db.limit, offset: offset }).then(
    (products) => {
      responseObject.data = products.pluck('dataValues').groupByField('price')
      log.info(`Fetching products. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 *  @description Store new product
 *  @route POST /api/v1/product
 */
const store = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const postData = {
    title: req.body.title,
    price: req.body.price,
    reference: req.body.reference,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }

  // Apply validation here
  const rules = {
    title: 'required',
    price: 'required|numeric',
    description: 'required',
    published: 'required|boolean'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    tone: ':attr doesn\'t match any of allowed one',
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
      await Product.create(postData, { fields: ['title', 'reference', 'description', 'price', 'published'], transaction }).then(newProduct => {
        responseObject.data = newProduct.dataValues
        consoleLog(responseObject.data)
        log.info(`New product created. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 *  @description Fetch specific product
 *  @route GET /api/v1/product/:product_id
 */
const edit = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  try {
    const id = req.params.product_id
    await Product.findOne({ where: { id: id }, include: { model: db.Review, as: 'reviews' } }).then(
      (updated) => {
        if (updated === null) {
          throw new Error('product not found')
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
 *  @description Update specific product
 *  @route PATCH /api/v1/product/:product_id
 */
const update = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const postData = {
    title: req.body.title,
    price: req.body.price,
    reference: req.body.reference,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }

  // Apply validation here
  const rules = {
    title: 'required',
    price: 'required|numeric',
    description: 'required',
    published: 'required|integer'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    tone: ':attr doesn\'t match any of allowed one',
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
        const id = req.params.product_id
        await Product.update(postData, { where: { id: id }, fields: ['title', 'description', 'price', 'published'], transaction }) // { fields: ['column_1', 'column_2',], where: { id: id } }
          .then(
            (updated) => {
              consoleLog(updated)
              log.info(`Product updated, id: ${id}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 *  @description Destroy specific product
 *  @route delete /api/v1/product/:product_id
 */
const destroy = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }
  const reference = req.params.reference
  await Product.destroy({ where: { reference: reference } }).then(
    (result) => {
      if (result === 0) {
        log.debug(`Product not found, reference: ${reference}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
        throw new Error('Product not found')
      }
      responseObject.msg = 'product successfully deleted'
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
