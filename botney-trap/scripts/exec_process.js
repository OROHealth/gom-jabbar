const util = require('util');
const exec = util.promisify(require('child_process').exec);

const execProcess = (command) => {
  console.log('Running >>>', command);
  console.log('\x1b[33m%s\x1b[0m', 'Please Wait...');

  return exec(command);
};

module.exports = execProcess;
