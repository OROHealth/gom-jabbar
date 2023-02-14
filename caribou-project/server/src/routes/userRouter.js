const userRouter = require('express').Router();
const { registerUser, getAllUsers } = require('../controllers/userController');

// @Desc    Get all Users
// @Method  GET
// @Route   /api/v1/user/
userRouter.get('/', getAllUsers);

// @Desc    Register/create a user with email and password
// @Method  POST
// @Route   /api/v1/user/register
// userRouter.post('/register', registerUser);

// @Desc    Login a user with email and password
// @Method  POST
// @Route   /api/v1/user/login
// @Explanation comparing the hashed password with the current password
// userRoutes.post('/login', loginUser);

// @Desc    Log User out of the application
// @Route   /api/v1/user/logout
// userRoutes.get('/logout', logoutUser);

// @Desc    get the current User that's logged in
// @Method  GET
// @Route   /api/v1/user/current
// usersRouter.get('/current', currentUser);

module.exports = userRouter;

// (req, res) => {
//   console.log('The Req User that just logged in', req.user);
//   if (!req.user) {
//     return;
//   }
//   const date = new Date();
//   console.log(`User ID:${req.user.id} logged in at ${date}`);
//   // Respond to the front end with the user that logged in
//   res.json(req.user);
// }
