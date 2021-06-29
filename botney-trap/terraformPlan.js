const { spawn, exec } = require("child_process");
const config = require("./config.json");

console.log(config);
// CONFIGURE CREDENTIALS

exec("ls | grep js", (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err);
  } else {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
});

const terraformPlan = spawn("terraform", ["-chdir=./terraform", "plan"]);

terraformPlan.stdout.on("data", (data) => {
  console.log(data);
});

terraformPlan.stderr.on("data", (data) => {
  console.log(data);
});

terraformPlan.on("error", (error) => {
  console.error(`error: ${error.message}`);
});

terraformPlan.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
