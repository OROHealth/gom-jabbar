const dbConfig = require('../config/dbConfig').development
const path = require('path')
const dumpFileName = 'recoveryData.sql'

var exec = require('child_process').exec

var rebuildFile = path.join(__dirname, dumpFileName)

var runSqlScript = function (file, callback) {
  const command = 'mysqldump -u ' + dbConfig.USER + ' -h ' + dbConfig.HOST + ' -p' + ' ' + dbConfig.DATABASE + ' > ' + file

  exec(command, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('Rebuild Error: ' + error)
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
      process.exit(1)
    }
    console.log('Successfully Rebuild Database using: ')
    console.log('   ' + file)
    callback()
  })
}

var rebuild = function () {
  runSqlScript(rebuildFile, function () {
    // process.exit(0)
  })
}
// dump database every five minutes
rebuild()
