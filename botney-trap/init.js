/**
 * Checkbox list examples
 */

"use strict";
const inquirer = require("inquirer");
const fs = require("fs");

const isValidDomain = (domain) => {
  return domain.match(
    new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/i)
  );
};

let initConfig = {};
let cloudsConfig = [];
let environmentConfig = {};

const questionsConfig = [
  {
    type: "input",
    name: "domain",
    message: "What's domain name you want to configure",
    validate(answer) {
      if (answer.length < 1 || !isValidDomain(answer)) {
        return "You must to type a valid domain";
      }
      return true;
    },
    filter: (answer) => {
      if (answer.startsWith("https://")) {
        return answer.replace("https://", "");
      }
      if (answer.startsWith("http://")) {
        return answer.replace("http://", "");
      }

      return answer;
    },
  },
  {
    type: "checkbox",
    message: "Select the clouds you want to enable",
    name: "cloudsNames",
    choices: [
      new inquirer.Separator(""),
      new inquirer.Separator(" = Clouds = "),
      {
        name: "aws",
        value: "aws",
      },
      {
        name: "digitalocean",
        value: "digitalocean",
      },
      new inquirer.Separator(""),
      {
        name: "Ask for more options - contact jhonsfran@gmail.com",
        disabled: "Unavailable at this time",
      },
    ],
    validate(answer) {
      if (answer.length < 1) {
        return "You must choose at least one cloud.";
      }

      return true;
    },
  },
  // AWS questions
  {
    type: "list",
    name: "clouds.aws.region",
    message:
      "Which region do you want to use to deploy your AWS infrastructure?",
    default: "us-west-2",
    choices: ["us-west-2", "us-west-1", "us-east-1", "us-east-2"],
    when: (answers) => {
      return !!answers.cloudsNames.includes("aws");
    },
  },
  {
    type: "list",
    name: "clouds.aws.node_size",
    message: "What node size do you want for your AWS nodes?",
    default: "t3.medium",
    choices: ["t3.medium", "t3.small", "t3.large"],
    when: (answers) => {
      return !!answers.cloudsNames.includes("aws");
    },
  },
  {
    type: "number",
    name: "clouds.aws.nodes",
    message: "How many nodes do you want to deploy to EKS AWS?",
    default: 3,
    when: (answers) => {
      return !!answers.cloudsNames.includes("aws");
    },
  },
  {
    type: "number",
    name: "clouds.aws.weight",
    message:
      "If you decide to loadbalance your app across clouds, what would be the weight for AWS",
    default: 0.5,
    when: (answers) => {
      // in order to configure weight both clouds has to be enabled
      return !!answers.cloudsNames.includes("aws", "digitalocean");
    },
    validate(answer) {
      if (answer < 0 || answer > 1) {
        return "weight has to be between 0 and 1";
      }
      return true;
    },
  },
  // digitalocean questions
  {
    type: "list",
    name: "clouds.digitalocean.region",
    message:
      "Which region do you want to use to deploy your Digitalocean infrastructure?",
    default: "nyc1",
    choices: ["nyc1", "nyc3", "sfo3"],
    when: (answers) => {
      return !!answers.cloudsNames.includes("digitalocean");
    },
  },
  {
    type: "list",
    name: "clouds.digitalocean.node_size",
    message: "What node size do you want for your digitalocean nodes?",
    default: "s-2vcpu-2gb",
    choices: ["s-2vcpu-2gb", "s-2vcpu-4gb", "s-4vcpu-8gb"],
    when: (answers) => {
      return !!answers.cloudsNames.includes("digitalocean");
    },
  },
  {
    type: "number",
    name: "clouds.digitalocean.nodes",
    message: "How many nodes do you want to deploy to K8s digitalocean?",
    default: 3,
    when: (answers) => {
      return !!answers.cloudsNames.includes("digitalocean");
    },
  },
  {
    type: "number",
    name: "clouds.digitalocean.weight",
    message:
      "If you decide to loadbalance your app across clouds, what would be the weight for digitalocean",
    default: 0.5,
    validate(answer) {
      if (answer < 0 || answer > 1) {
        return "weight has to be between 0 and 1";
      }
      return true;
    },
    when: (answers) => {
      // in order to configure weight both clouds has to be enabled
      return !!answers.cloudsNames.includes("aws", "digitalocean");
    },
  },
  // environments configuration
  {
    type: "checkbox",
    message:
      "Select default environments to deploy. You can deploy new environments after this step",
    name: "environmentsNames",
    choices: [
      new inquirer.Separator(""),
      new inquirer.Separator(" = environments = "),
      {
        name: "production",
        value: "production",
      },
      {
        name: "development",
        value: "development",
      },
    ],
    validate(answer) {
      if (answer.length < 1) {
        return "You must choose at least one environment.";
      }

      return true;
    },
  },
  // production questions
  {
    type: "input",
    name: "environments.production.subdomain",
    message: "What is the subdomain for the production environment",
    default: "production",
    when: (answers) => {
      return !!answers.environmentsNames.includes("production");
    },
  },
  {
    type: "checkbox",
    message:
      "Select the origins for production. If you want to spill out the load across clouds, you can choose more than one cloud",
    name: "environments.production.origins",
    choices: [
      {
        name: "aws",
        value: "aws",
      },
      {
        name: "digitalocean",
        value: "digitalocean",
      },
    ],
    validate(answer) {
      if (answer.length < 1) {
        return "You must choose at least one cloud.";
      }

      return true;
    },
    when: (answers) => {
      return (
        !!answers.environmentsNames.includes("production") &&
        !!answers.cloudsNames.includes("aws", "digitalocean")
      );
    },
  },
  // development questions
  {
    type: "input",
    name: "environments.development.subdomain",
    message: "What is the subdomain for the development environment",
    default: "development",
    when: (answers) => {
      return !!answers.environmentsNames.includes("development");
    },
  },
  {
    type: "checkbox",
    message:
      "Select the origins for development. If you want to spill out the load across clouds, you can choose more than one cloud",
    name: "environments.development.origins",
    choices: [
      {
        name: "aws",
        value: "aws",
      },
      {
        name: "digitalocean",
        value: "digitalocean",
      },
    ],
    validate(answer) {
      if (answer.length < 1) {
        return "You must choose at least one cloud.";
      }

      return true;
    },
    when: (answers) => {
      // TODO: validate when this is not settled properly
      return (
        !!answers.environmentsNames.includes("development") &&
        !!answers.cloudsNames.includes("aws", "digitalocean")
      );
    },
    validate: async () => {
      await new Promise((r) => setTimeout(r, 3000));
      return true;
    },
    filter: async (answer) => {
      await new Promise((r) => setTimeout(r, 3000));
      return answer;
    },
    filteringText: "Validating your answer...",
    validatingText: "Validating your configuration...",
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Confirm your configuration (just hit enter for YES)?",
    default: true,
  },
];

function askConfig() {
  inquirer.prompt(questionsConfig).then((answers) => {
    answers.cloudsNames.forEach((cloud) => {
      answers.clouds[cloud].enabled = true;
    });
    const config = JSON.stringify(answers, null, "  ");
    console.log(config);
    fs.writeFile("config.json", config, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    });
  });
}

askConfig();
