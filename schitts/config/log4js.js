const logConfig = require('./log4js.json')
const log4js = require('log4js')
log4js.configure(logConfig)

module.exports = log4js
