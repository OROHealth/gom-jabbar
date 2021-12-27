
const log4js = require('../config/log4js')
var log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
var path = require('path')
module.exports = function logErrors (err, req, res, next) {
  console.error(err.stack)
  log.error(`${err}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  next(err)
}
