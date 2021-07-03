#!/usr/bin/env node

/**
 * Botney-trap questions
 */

"use strict";
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clui = require("clui");
const fs = require("fs");

const Spinner = clui.Spinner;
clear();

console.log(chalk.yellow(figlet.textSync("Botney CLI")));

const isValidDomain = (domain) => {
  return domain.match(
    new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/i)
  );
};

let configAnswers = {};
let envAnswers = {};

const defaultEnvs = ["production", "development"];
const defaultClouds = ["aws", "digitalocean"];
const cloudChoices = {
  aws: {
    instance: ["us-west-2", "us-west-1", "us-east-1", "us-east-2"],
    size: ["t3.medium", "t3.small", "t3.large"],
  },
  digitalocean: {
    instance: ["nyc1", "nyc3", "sfo3"],
    size: ["s-2vcpu-2gb", "s-2vcpu-4gb", "s-4vcpu-8gb"],
  },
};

const createCloudQuestions = () =>
  defaultClouds
    .map((cloud) => {
      const questions = [
        {
          type: "list",
          name: `clouds.${cloud}.region`,
          message: `Which region do you want to use to deploy your ${cloud} infrastructure?`,
          default: cloudChoices[cloud].instance[0],
          choices: cloudChoices[cloud].instance,
          when: (answers) => {
            return !!answers.cloudsNames.includes(cloud);
          },
        },
        {
          type: "list",
          name: `clouds.${cloud}.node_size`,
          message: `What node size do you want for your ${cloud} nodes?`,
          default: cloudChoices[cloud].size[0],
          choices: cloudChoices[cloud].size,
          when: (answers) => {
            return !!answers.cloudsNames.includes(cloud);
          },
        },
        {
          type: "number",
          name: `clouds.${cloud}.nodes`,
          message: `How many nodes do you want to deploy to ${cloud}?`,
          default: 3,
          when: (answers) => {
            return !!answers.cloudsNames.includes(cloud);
          },
        },
        {
          type: "number",
          name: `clouds.${cloud}.weight`,
          message: `If you decide to loadbalance your app across clouds, what would be the weight for ${cloud}`,
          default: 0.5,
          when: (answers) => {
            // in order to configure weight both clouds has to be enabled
            return !!answers.cloudsNames.includes(defaultClouds);
          },
          validate: (answer) => {
            if (answer < 0 || answer > 1) {
              return "weight has to be between 0 and 1";
            }
            return true;
          },
        },
      ];

      return questions;
    })
    .flat();

const createEnvQuestions = () =>
  defaultEnvs
    .map((env) => {
      const questions = [
        {
          type: "input",
          name: `environments.${env}.subdomain`,
          message: `What is the subdomain for the ${env} environment`,
          default: `${env}`,
        },
        {
          type: "checkbox",
          message: `Select the origins for ${env}. If you want to spill out the load across clouds, you can choose more than one cloud`,
          name: `environments.${env}.origins`,
          choices: configAnswers.cloudsNames,
          validate: (answer) => {
            if (answer.length < 1) {
              return "You must choose at least one cloud.";
            }

            return true;
          },
        },
      ];

      return questions;
    })
    .flat();

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
      ...defaultClouds,
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
  // cloud questions
  ...createCloudQuestions(),
];

const questionsEnv = [
  // more envrionments
  {
    type: "confirm",
    name: "addEnv",
    message: `Do you want to create new environment? The default environments are: ${defaultEnvs.join(
      " "
    )} (just hit enter for YES)?`,
    default: true,
  },
  {
    type: "input",
    name: "newEnv",
    message: `Type the name of the extra environment you want to deploy`,
    default: "testing",
    validate: (answer) => {
      if (answer < 1) {
        return "The name of the environment is invalid";
      }
      return true;
    },
    when: (answers) => {
      return !!answers.addEnv;
    },
  },
];

function askAddEnvironment() {
  inquirer.prompt(questionsEnv).then((answers) => {
    if (answers.addEnv === true) {
      const env = answers.newEnv.trim();

      if (!defaultEnvs.includes(env)) {
        defaultEnvs.push(answers.newEnv.trim());
      }

      askAddEnvironment();
    } else {
      askConfigEnvironment();
    }
  });
}

function askConfigEnvironment() {
  const questions = createEnvQuestions();
  inquirer.prompt(questions).then((answers) => {
    envAnswers = answers;
    askConfirm();
  });
}

function askConfig() {
  inquirer.prompt(questionsConfig).then((answers) => {
    configAnswers = answers;
    askAddEnvironment();
  });
}

function askConfirm() {
  const answers = { ...configAnswers, ...envAnswers };
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Confirm your configuration (just hit enter for YES)?",
        default: true,
      },
    ])
    .then((confirm) => {
      if (!confirm.confirm) exit(0);

      answers.cloudsNames.forEach((cloud) => {
        answers.clouds[cloud].enabled = true;
      });

      const config = JSON.stringify(answers, null, "  ");
      process.stdout.write("\n");
      console.log(config);
      process.stdout.write("\n");

      const countdown = new Spinner("Validating your configuration...  ", [
        "⣾",
        "⣽",
        "⣻",
        "⢿",
        "⡿",
        "⣟",
        "⣯",
        "⣷",
      ]);
      countdown.start();

      var number = 5;
      setInterval(function () {
        number--;
        countdown.message("Exiting in " + number + " seconds...  ");
        if (number === 0) {
          process.stdout.write("\n");
          process.stdout.write("\n");

          fs.writeFile("config.json", config, "utf8", (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("File has been created");
            process.exit(0);
          });
        }
      }, 1000);
    });
}

askConfig();
