const bunyan = require('bunyan');

const logger = (context, text, location) => {
  const log = bunyan.createLogger({ name: location });

  if (context === 'info') {
    log.info(text);
  }

  if (context === 'error') {
    log.error(text);
  }
};

module.exports = logger;
