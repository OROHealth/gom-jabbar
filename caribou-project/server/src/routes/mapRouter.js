const mapRouter = require('express').Router();
const { registerUser, loginUser, logoutUser, refreshUserToken } = require('../controllers/userController');

// @Desc    Get all Users
// @Method  GET
// @Route   /api/v1/user/
// userRouter.get('/', getAllUsers);

// @Desc    Register/create a user with email and password
// @Method  POST
// @Route   /api/v1/user/register
mapRouter.post('/register', registerUser);

// @Desc    Login a user with email and password
// @Method  POST
// @Route   /api/v1/user/login
mapRouter.post('/login', loginUser);

// @Desc    Log User out of the application
// @Route   /api/v1/user/logout
mapRouter.delete('/logout', logoutUser);

// @Desc    refresh the user Token
// @Method  GET
// @Route   /api/v1/user/refresh-token
mapRouter.post('/refresh-token', refreshUserToken);

module.exports = mapRouter;
