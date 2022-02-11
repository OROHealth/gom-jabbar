
const log4js = require('../config/log4js')
const log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
const path = require('path')
module.exports = function logErrors (err, req, res, next) {
  if (process.env.NODE_ENV === 'local') {
    console.error(err.stack)
  }
  log.error(`${err}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  next(err)
}
