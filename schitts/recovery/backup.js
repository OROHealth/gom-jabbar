const dbConfig = require('../config/dbConfig').development
var fs = require('fs')
const path = require('path')
var suffix = new Date().getTime().toString()
var wstream = fs.createWriteStream(path.join(__dirname, `${suffix}_backup.sql`))

var spawn = require('child_process').spawn
var child = spawn('mysqldump', [
  `-u${dbConfig.USER}`,
  `-p${dbConfig.PASSWORD}`,
  `${dbConfig.DATABASE}`
])

child.stdout.on('data', function (data) {
  console.log('stdout:' + data)
})

child.stderr.on('data', function (data) {
  console.log('stderr:' + data)
})

child.stdin.on('data', function (data) {
  console.log('stdin:' + data)
})

child
  .stdout
  .pipe(wstream)
  .on('finish', function () {
    console.log('DATABASE BACKUP COMPLETED')
  })
  .on('error', function (err) {
    console.log(err)
  })
