require("dotenv").config();

const { spawn } = require("child_process");

const terraformApply = spawn("terraform", [
  "-chdir=./terraform",
  "apply",
  "./apply.tfplan",
]);

terraformApply.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

terraformApply.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

terraformApply.on("error", (error) => {
  console.error(`error: ${error.message}`);
});

terraformApply.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
