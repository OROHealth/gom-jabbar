const userRouter = require('express').Router();
const { registerUser, loginUser, refreshUserToken } = require('../controllers/userController');

// @Desc    Get all Users
// @Method  GET
// @Route   /api/v1/user/
// userRouter.get('/', getAllUsers);

// @Desc    Register/create a user with email and password
// @Method  POST
// @Route   /api/v1/user/register
userRouter.post('/register', registerUser);

// @Desc    Login a user with email and password
// @Method  POST
// @Route   /api/v1/user/login
// @Explanation comparing the hashed password with the current password
userRouter.post('/login', loginUser);

// @Desc    Log User out of the application
// @Route   /api/v1/user/logout
// userRoutes.get('/logout', logoutUser);

// @Desc    refresh the user Token
// @Method  GET
// @Route   /api/v1/user/refresh-token
userRouter.post('/refresh-token', refreshUserToken);

module.exports = userRouter;
