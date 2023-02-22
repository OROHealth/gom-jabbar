const userRouter = require('express').Router();
const { saveAntlerExchangeCaribou } = require('../controllers/antlerExchangeController');

// @Desc    Saves the users who want to antler exchange
// @Method  POST
// @Route   /api/v1/antler-exchange
userRouter.post('/', saveAntlerExchangeCaribou);

module.exports = userRouter;
