const dbConfig = require('../config/dbConfig').development
var fs = require('fs')
const path = require('path')
const log4js = require('../config/log4js')
var log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
var suffix = new Date().toLocaleDateString().replace(new RegExp(/\//, 'g'), '_')
const filePath = path.join(__dirname, `${suffix}_backup.sql`)
var wstream = fs.createWriteStream(filePath)
var spawn = require('child_process').spawn
var child = spawn('mysqldump', [
  `-u${dbConfig.USER}`,
  `-p${dbConfig.PASSWORD}`,
  `${dbConfig.DATABASE}`
])

/* child.stdout.on('data', function (data) {
  console.log('stdout:' + data)
})

child.stderr.on('data', function (data) {
  console.log('stderr:' + data)
})

child.stdin.on('data', function (data) {
  console.log('stdin:' + data)
}) */

child
  .stdout
  .pipe(wstream)
  .on('finish', function () {
    log.error(`DATABASE BACKUP COMPLETED. File Located at: ${filePath} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  })
  .on('error', function (err) {
    console.log(err)
  }).on('close', (code, signal) => {
    console.log(
    `child process terminated due to receipt of code ${code}`)
  })
