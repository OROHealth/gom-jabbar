const bunyan = require('bunyan');

const logger = (context, text) => {
  const log = bunyan.createLogger({ name: text });

  if (context === 'info') {
    log.info(text);
  }

  if (context === 'error') {
    log.error(text);
  }
};

module.exports = logger;
