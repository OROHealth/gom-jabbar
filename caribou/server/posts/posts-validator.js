//loading external resources
const logger = require('../logger');

const NO_ERRORS = null;

// content

function getPostValidationError({ content }) {

	if (content && content.length < 5) {
		logger.error(`Invalid content '${content}' supplied`);
		return {
			error: {
				message: `'content' must be at least 5 characters`
			}
		};
	}

	return NO_ERRORS;
}

module.exports = {
	getPostValidationError
};