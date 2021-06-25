const util = require('util');
const exec = util.promisify(require('child_process').exec);

// const execProcess = (command) => {
//   console.log('Running >>>', command);
//   return exec(command);
// };

// (async () => {
//   const { stdout: deploymentSuceeeded, stderr: deploymentError } = spawn(
//     `/bin/sh ./botney-trap.sh`
//   );
//   console.log(deploymentSuceeeded);
// })();

const { spawn } = require('child_process');
const ls = spawn('/bin/sh', ['botney-trap.sh']);
let logs = ls.stdout.on('data', (data) => {
  logs = data;
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

const http = require('http');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(logs);
});

server.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
