const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const log = require('../utils/logger');
const { lowerCase, signAccessToken } = require('../helpers/helpers');
// const path = require('path');
// const { nextTick } = require('process')

// @Desc     Display all Users
// @Method   GET
// @Route    /api/v1/users
async function getAllUsers(_req, res) {
  res.json(await UserModel.find({}));
}

// @Desc    Register a user with email and password
// @Method  POST
// @Route   /api/v1/users
async function registerUser(req, res) {
  const { email, password, avatarImage } = req.body;

  let errors = [];
  let success = [];

  // Check required fields
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
    res.json(errors);
  } else {
    // [] Check if user already exists in the database
    await UserModel.findOne({ email: email }).then(async user => {
      if (user) {
        // If User Already Exists. Then we displayed in the frontend a message
        errors.push({ errorMsg: "I'm sorry this Caribou already exists!" });
        res.json(errors);
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
          .then(userSaved => {
            // log('info', req.body, 'userController');
            success.push({ successMsg: 'Account created successfully' });
          })
          .catch(err => {
            log('error', `Error Saving newUser: ${err}`, 'userController');
          });

        const accessToken = await signAccessToken(newUser.uuId);
        // response with an object, to get it in json format
        res.status(201).send({ accessToken }).end();
      }
    });
  }
}

// @Desc    login a user with email and password
// @Method  POST
// @Route   /api/v1/user/login
// TODO Email and Password Login Start
async function loginUser(req, res) {
  console.log('Request data:', req.body);

  const { email, password } = req.body;
  const errors = [];
  const success = [];

  // Check required fields
  if (!email || !password) {
    errors.push({ errorMsg: 'Please fill in all fields' });
  }

  // Check Regular expression for email
  const regex = /^[\w-\.]+-carib@([\w-]+\.)+[\w-]{2,4}$/g;
  const found = email.match(regex);
  if (!found) {
    errors.push({ errorMsg: 'Humans are not allowed!' });
  }

  // Logic to respond with the error messages
  if (errors.length > 0) {
    console.log('Errors:', errors);

    res.json({ errorMsg: errors }).end();
  } else {
    await UserModel.findOne({ email: email }).then(async user => {
      if (!user) {
        errors.push({ errorMsg: 'This Caribou does not exist. Are you a Human?' });
        res.json(errors).end();
      } else {
        success.push({ successMsg: 'Caribou logged in successfully.' });
        // we want to authenticate the user in our database
        console.log('The User that want to Login', user);
        // errors.push({ msg: 'Authentication Error, Please try again'})
      }
    });
  }
}

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
