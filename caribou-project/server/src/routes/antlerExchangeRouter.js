const userRouter = require('express').Router();
const { saveAntlerExchangeCaribou, getAntlerExchangeCaribous } = require('../controllers/antlerExchangeController');

// @Desc    Saves the caribou who want to antler exchange
// @Method  POST
// @Route   /api/v1/antler-exchange
userRouter.post('/', saveAntlerExchangeCaribou);

// @Desc    Gets all the caribous who want to antler exchange
// @Method  GET
// @Route   /api/v1/antler-exchange
userRouter.get('/', getAntlerExchangeCaribous);

module.exports = userRouter;
