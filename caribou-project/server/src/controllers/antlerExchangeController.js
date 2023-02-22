const log = require('../utils/logger');

// @Desc    Saves the users who want to antler exchange
// @Method  POST
// @Route   /api/v1/antler-exchange
const saveAntlerExchangeCaribou = (req, res) => {
  log('info', req.body, 'antlerExchange Controller');
  res.json({ message: 'Hello' });
  try {
    // new user object
    const newAntlerExchangeCaribou = {
      email,
      uuid,
    };

    // save the caribour to the antler exchange list
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveAntlerExchangeCaribou };
