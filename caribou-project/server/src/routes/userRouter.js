const userRouter = require('express').Router();
const { registerUser, loginUser, refreshUserToken } = require('../controllers/userController');

// @Desc    Register/create a user with email and password
// @Method  POST
// @Route   /api/v1/user/register
userRouter.post('/register', registerUser);

// @Desc    Login a user with email and password
// @Method  POST
// @Route   /api/v1/user/login
userRouter.post('/login', loginUser);

// @Desc    refresh the user Token
// @Method  GET
// @Route   /api/v1/user/refresh-token
userRouter.post('/refresh-token', refreshUserToken);

module.exports = userRouter;
