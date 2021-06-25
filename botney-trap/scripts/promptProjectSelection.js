const prompts = require('prompts');
prompts.override(require('yargs').argv);

const promptProjectSelection = (message, choices) =>
  prompts([
    {
      name: 'services',
      type: 'multiselect',
      message,
      choices,
    },
  ]);

module.exports = promptProjectSelection;
