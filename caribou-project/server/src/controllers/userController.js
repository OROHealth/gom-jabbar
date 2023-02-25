const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const log = require('../utils/logger');
const { lowerCase, signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/helpers');
const createError = require('http-errors');

// @Desc    Register a user with email and password
// @Method  POST
// @Route   /api/v1/users
async function registerUser(req, res) {
  const { email, password, avatarImage } = req.body;

  let errors = [];
  let success = [];

  // Check Required fields
  if (!email || !password) {
    errors.push({ errorMsg: 'Please fill in all fields Caribou' });
  }

  // Check Regular expression for email
  const regex = /^[\w-\.]+-carib@([\w-]+\.)+[\w-]{2,4}$/g;
  const found = email.match(regex);
  if (!found) {
    errors.push({ errorMsg: 'Humans are not allowed!' });
  }

  // Check that passwords at least 6 characters
  if (password.length < 6) {
    errors.push({ errorMsg: 'Passwords should be at least 6 characters' });
  }

  if (errors.length > 0) {
    // If there is an issue then I want to rerender the registration form with the error message
    return res.status(401).json(errors);
  } else {
    if (errors.length < 1) {
      try {
        // [] Check if user already exists in the database
        await UserModel.findOne({ email: email }).then(async user => {
          if (user) {
            // If User Already Exists. Then we displayed in the frontend a message
            errors.push({ errorMsg: "I'm sorry this Caribou already exists!" });
            return res.status(401).json(errors);
          } else {
            // [] Encrypt password - Hash the password before saving it to the database
            // Generate a salt in order to create a hash
            // returns the encrypted password, of the newUser that just registered.
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
            const uuId = new mongoose.Types.ObjectId();

            // Created a new instance of the user, but haven't saved it yet
            const newUser = new UserModel({
              email: lowerCase(email),
              password: hashedPassword,
              avatarImage,
              uuId,
            });

            // set the new user's password to the encrypted password version
            newUser.password = hashedPassword;

            // save the newUser to the Database
            await newUser
              .save()
              .then(_userSaved => {
                success.push({ successMsg: 'Welcome fellow Caribou.' });
              })
              .catch(err => {
                log('error', `Error Saving newUser: ${err}`, 'userController');
              });

            const accessToken = await signAccessToken(newUser.uuId);
            const refreshToken = await signRefreshToken(newUser.uuId);
            // response with an object, to get it in json format
            res.status(201).json({ accessToken, refreshToken, avatarImage, email, success });
          }
        });
      } catch (error) {
        log('error', `Line 86: Error Saving newUser: ${err}`, 'userController');
      }
    }
  }
}

// @Desc    Login a user with email and password
// @Method  POST
// @Route   /api/v1/user/login
// TODO Email and Password Login Start
async function loginUser(req, res) {
  const { email, password } = req.body;

  const errors = [];
  const success = [];

  // Check required fields
  if (!email || !password) {
    errors.push({ errorMsg: 'Please fill in all fields' });
  }

  // Check Regular Expression for email
  const regex = /^[\w-\.]+-carib@([\w-]+\.)+[\w-]{2,4}$/g;
  const found = email.match(regex);
  if (!found) {
    errors.push({ errorMsg: 'Humans are not allowed!' });
  }

  // Check that passwords at least 6 characters
  if (password.length < 6) {
    errors.push({ errorMsg: 'Passwords should be at least 6 characters' });
  }

  // Logic to respond with the error messages
  if (errors.length > 0) {
    return res.status(401).json(errors).end();
  } else {
    if (errors.length < 1) {
      try {
        // Lowercase the email
        const lowerCaseEmail = lowerCase(email);

        // Finding the user in the Database
        await UserModel.findOne({ email: lowerCaseEmail }).then(async user => {
          // checks if there is a user
          if (!user) {
            errors.push({ errorMsg: 'This Caribou does not exist. Are you a Human?' });
            return res.status(401).json(errors);
          } else {
            // If user is found - compare the password with the user in the Database // console.log('isValidPassword', isValidPassword); // returns true if valid
            const isValidPassword = await bcrypt.compare(password, user.password);
            log('error', `Line 130: Is it a Valid Password? ${isValidPassword} `, 'userController');

            if (!isValidPassword) {
              errors.push({ errorMsg: 'Your Caribou username or password is not valid.' });
              return res.status(401).json(errors).end();
            }

            // Generate a new accessToken
            const accessToken = await signAccessToken(user.uuId);
            const refreshToken = await signRefreshToken(user.uuId);
            const avatarImage = user.avatarImage;
            const email = user.email;

            success.push({ successMsg: 'Welcome Caribou. Logging in was successful.' });
            return res.status(201).json({ accessToken, refreshToken, avatarImage, email, success });
          }
        });
      } catch (error) {
        log('Line 147: ', `Line 153: Error  -> ${error}`, 'userController');
      }
    }
  }
}

const refreshUserToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const newAccessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    res.status(201).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    log('error', `${error}`, 'userController');
    next(error);
  }
};

async function getUser(req, res) {
  const { email } = req.body;
  try {
    await userModel.findOne({ email: email }).then(user => {
      res.status(200).json({ user });
    });
  } catch (error) {
    log('error', `Error Getting User ${error}`, 'userController');
  }
}

module.exports = {
  registerUser,
  loginUser,
  refreshUserToken,
  getUser,
};
