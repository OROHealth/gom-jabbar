require("dotenv").config();

const { spawn } = require("child_process");
const config = require("./config.json");

const terraformArgs = [
  "-chdir=./terraform",
  "plan",
  // General
  "-var",
  `environments=${JSON.stringify(config.environments)}`,
  "-var",
  `domain=${config.domain}`,
  // AWS
  "-var",
  `aws_region=${config.clouds?.aws?.region || ""}`,
  "-var",
  `number_nodes_aws=${config.clouds?.aws?.nodes || 0}`,
  "-var",
  `node_size_aws=${config.clouds?.aws?.node_size || 0}`,
  "-var",
  `enable_aws=${config.clouds?.aws?.enabled || false}`,
  "-var",
  `weight_aws=${config.clouds?.aws?.weight || 0}`,
  // digitalocean
  "-var",
  `digitalocean_region=${config.clouds?.digitalocean?.region || ""}`,
  "-var",
  `number_nodes_do=${config.clouds?.digitalocean?.nodes || 0}`,
  "-var",
  `node_size_do=${config.clouds?.digitalocean?.node_size || 0}`,
  "-var",
  `enable_digitalocean=${config.clouds?.digitalocean?.enabled || false}`,
  "-var",
  `weight_digitalocean=${config.clouds?.digitalocean?.weight || 0}`,
  "-out=apply.tfplan",
];

const terraformPlan = spawn("terraform", terraformArgs);

terraformPlan.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

terraformPlan.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

terraformPlan.on("error", (error) => {
  console.error(`error: ${error.message}`);
});

terraformPlan.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
