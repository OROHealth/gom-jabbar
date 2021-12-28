const dbConfig = require('../config/dbConfig').development
const path = require('path')
const dumpFileName = 'backup.sql'

var exec = require('child_process').exec

// create file
var rebuildFile = path.join(__dirname, dumpFileName)
var check
var runSqlScript = function (file, callback) {
  const command = 'mysqldump -u ' + dbConfig.USER + ' -h ' + dbConfig.HOST + ' -p' + dbConfig.PASSWORD + ' ' + dbConfig.DATABASE + ' < ' + file

  check = exec(command, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('Rebuild Error: ' + error)
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
      process.exit(1)
    }
    callback()
  })
}

var rebuild = function () {
  runSqlScript(rebuildFile, function () {
    console.log('DATABASE RESCOVERY COMPLETED')
    process.exit(0)
  })
}
rebuild()
