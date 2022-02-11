// autoload index.js
const db = require('../../models/_index')
const consoleLog = require('../../helpers/helpers').consoleLog // output into console regarding .env Log flag
const isNumber = require('../../helpers/helpers').isNumber
const { Op } = require('sequelize')
const { isTrue } = require('../../helpers/helpers')
const log4js = require('../../config/log4js')
const log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
const path = require('path')
var validationError = {}
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Validator = require('Validator')
// create main Model
const User = db.User
// Methods
/**
 * @route GET /api/v1/user
 * @description Fetch user
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
  await User.findAll({ attributes: ['reference', 'first_name', 'last_name', 'email', 'reference'], limit: db.limit, offset: offset }).then(
    (users) => {
      responseObject.data = users.pluck('dataValues')
      log.info(`Fetching users, count:${users.length} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
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
 * @route POST /api/v1/user/signup
 * @description Store new user
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const signUp = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const hash = cryptPassword(req.body.password)

  try {
    await db.sequelize.transaction(async (transaction) => {
      const postData = {
        first_name: req.body?.first_name,
        last_name: req.body?.last_name,
        email: req.body?.email,
        password: hash
      }

      // Apply validation here
      const rules = {
        first_name: 'required',
        last_name: 'required',
        email: 'required|email', // can be a piped string or an array of strings
        password: 'required'
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
      // check if email already exists
      const check = await User.findOne({ where: { email: postData.email } })

      if (!check) {
        await User.create(postData, { fields: ['first_name', 'last_name', 'reference', 'email', 'password'], transaction }).then(newUser => {
          responseObject.data = newUser.dataValues
          consoleLog(responseObject.data)
          log.info(`New user created. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
          return res.status(201).json(responseObject)
        }).catch(err => { // SequelizeValidationError
          throw (err)
        })
      } else {
        responseObject.status = false
        responseObject.msg = `email: ${postData.email}, already exist`
        return res.status(200).json(responseObject)
      }
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
 * @route POST /api/v1/user/signin
 * @description SignIn User
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const signIn = async (req, res) => {
  const responseObject = {
    status: true,
    data: null,
    error: {},
    msg: ''
  }

  const email = req.body.email
  const password = req.body.password

  // Require validation here
  // Apply validation here
  const rules = {
    email: 'required|email', // can be a piped string or an array of strings
    password: 'required'
  }

  const messages = {
    // custom message for based rules
    required: 'You forgot the :attr field',
    email: ':attr is not valid',
    // custom message for specific rule of attribute
    'receiver.email': 'The receiver email address is not valid'
  }

  const v = Validator.make({ email, password }, rules, messages)

  if (v.fails()) {
    const errors = v.getErrors()
    console.log(errors)
    responseObject.status = false
    // display first validation error
    responseObject.msg = (errors[Object.keys(errors)[0]])[0]

    return res.status(200).json(responseObject)
  }

  const user = await User.findOne({ where: { email: email } })

  if (!user) {
    log.debug(`email not found, email: ${email}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
    responseObject.msg = 'bad credentials, email not found'
    responseObject.status = false
    res.status(400).json(responseObject)
  }

  const match = comparePassword(password, user.dataValues.password)
  if (!match) {
    log.debug(`wrong password: ${password}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
    responseObject.msg = 'bad credentials, password didn\'t match'
    responseObject.status = false
    res.status(400).json(responseObject)
  } else {
    const data = {
      first_name: user.dataValues.first_name,
      last_name: user.dataValues.last_name,
      email: user.dataValues.email,
      issuer: 'http://localhost:5000'
      // iat: 120
    }
    // set token here and send it (using jsonwebtoken)
    responseObject.data = {
      access: jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' }),
      refresh: jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' })
    }
    // store refresh token
    await User.update({ token: responseObject.data.refresh }, { where: { email: email }, fields: ['token'] })

    // keep refresh token to cookie
    res.cookie('jwt_cookie', responseObject.data.refresh, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).json(responseObject)
  }
}

/**
 * @route POST /api/v1/user/logout
 * @description SignIn User
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const logout = async (req, res) => {
  // on client, also delete the accessToken
  const refreshToken = req.body.refreshToken
  if (!refreshToken) return res.sendStatus(204)

  // delete refresh token into db
  const deleteToken = await User.update({ token: null }, { where: { token: refreshToken }, fields: ['token'] })

  // delete cookies
  if (deleteToken) {
    res.clearCookie('jwt_cookie', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
  }

  return res.sendStatus(204) // No Content
}

/**
 * @route GET /api/v1/user/refresh
 * @description SignIn User
 * @summary summary
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const refresh = async (req, res) => {
  // on client, also delete the accessToken
  const refreshToken = req.body.refreshToken
  if (!refreshToken) return res.sendStatus(204)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      // if (err.name?.includes('TokenExpiredError')) console.log('token expired')

      return res.status(401).json({ msg: err.message })
    }

    const data = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      issuer: 'http://localhost:5000'
      // iat: 120
    }
    // create new access token
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
    return res.status(200).json({ token: accessToken })
  })
}

function cryptPassword (pwd) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(pwd, salt)
  consoleLog(hash)
  return hash
}

function comparePassword (pwd, hashedPassword) {
  return bcrypt.compareSync(pwd, hashedPassword)
}

module.exports = {
  index,
  signUp,
  signIn,
  logout,
  refresh
}
