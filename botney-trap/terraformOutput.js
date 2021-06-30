require("dotenv").config();
const { spawn } = require("child_process");
const config = require("./config.json");

const terraformOutput = spawn("terraform", [
  "-chdir=./terraform",
  "output",
  "-json",
]);

terraformOutput.stdout.on("data", (data) => {
  console.log(
    `stdout: Please use this DNS nameserver to configure your domain ${data}`
  );
});

terraformOutput.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

terraformOutput.on("error", (error) => {
  console.error(`error: ${error.message}`);
});

terraformOutput.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
