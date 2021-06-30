require("dotenv").config();
const { spawn } = require("child_process");
const { async } = require("rxjs");
const config = require("./config.json");

// const argv = require("minimist")(process.argv.slice(2));

// if (argv._[0] === "aws" || argv._[0] === "digitalocean") {
//   child = exec("node init.js", function (error, stdout, stderr) {
//     console.log("stdout: " + stdout);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
// } else {
//   console.log(
//     `stdout: the cloud provider specified is not supported at the moment`
//   );
// }

// deployment aws apply production sebastianfranco.me prod
const environments = config.environments;
const domain = config.domain;

Object.entries(environments).forEach((env) => {
  const environment = env[0];
  const subdomain = env[1].subdomain;
  const origins = env[1].origins;

  origins.forEach(async (origin) => {
    const deployArgs = ["bin/deployment"];
    deployArgs.push(origin);
    deployArgs.push("apply");
    deployArgs.push(environment);
    deployArgs.push(domain);
    deployArgs.push(subdomain);

    // wait until each deployment finish
    const deploy = await spawn("bash", deployArgs);

    deploy.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    deploy.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    deploy.on("error", (error) => {
      console.error(`error: ${error.message}`);
    });

    deploy.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
});
