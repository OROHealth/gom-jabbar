const { spawn } = require("child_process");
const config = require("./config.json");

console.log(config);

const terraformPlan = spawn("terraform", ["-chdir=./terraform", "validate"]);

terraformPlan.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

terraformPlan.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

terraformPlan.on("error", (error) => {
  console.log(`error: ${error.message}`);
});

terraformPlan.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
