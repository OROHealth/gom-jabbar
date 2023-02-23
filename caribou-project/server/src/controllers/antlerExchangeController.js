const log = require('../utils/logger');
const UserModel = require('../models/userModel');
const AntlerExchangeModel = require('../models/antlerExchangeModel');
const mongoose = require('mongoose');
const { lowerCase } = require('../helpers/helpers');

async function getAntlerExchangeCaribous(req, res) {
  try {
    // log('info', "App Currently Getting all Antler Exchange caribou's in the Database", 'antlerExchangeController');
    const allAntlerExchangeCaribous = await AntlerExchangeModel.find({});
    res.status(200).json({ allAntlerExchangeCaribous });
  } catch (error) {
    log('error', `Error saving antler Exchange Caribou: ${error}`, 'antlerExchangeController');

    errors.push({ errorMsg: `Error Saving you to the Antler Exchange Secret Meetings. Please try Again.` });
    return res.status(400).json(errors);
  }
}

// @Desc    Saves the users who want to antler exchange
// @Method  POST
// @Route   /api/v1/antler-exchange
async function saveAntlerExchangeCaribou(req, res) {
  const { email, userImage, customRoomNumber } = req.body;
  // log('info', email, 'antlerExchange Controller');
  log('info', `custom room number: ${customRoomNumber}`, 'antlerExchange Controller');

  let errors = [];
  const success = [];

  // catch if there is no email given
  if (!email) {
    errors.push({ errorMsg: 'Please fill in all fields Caribou' });
    return res.status(401).json(errors).end();
  }

  try {
    // Lowercase the email
    const lowerCaseEmail = lowerCase(email);

    // log('info', `Email sent by client: ${email}`, 'antlerExchangeController');
    // save the caribou to the antler exchange list
    await UserModel.findOne({ email: lowerCaseEmail }).then(async user => {
      // console.log(user);
      if (!user) {
        errors.push({ errorMsg: 'Error: Caribou was not found.  Unable to let you join. Please Sign up! ' });
        return res.status(401).json(errors).end();
      } else {
        // creating a new universal Id
        const uuId = new mongoose.Types.ObjectId();

        // new user object
        const newAntlerExchangeCaribou = new AntlerExchangeModel({
          email: lowerCaseEmail,
          uuId,
          avatarImage: userImage,
          customRoomNumber,
        });

        await AntlerExchangeModel.findOne({ email: lowerCaseEmail }).then(async caribouExist => {
          if (caribouExist) {
            errors.push({ errorMsg: 'You were already added.' });
            return res.status(401).json(errors).end();
          } else {
            await newAntlerExchangeCaribou
              .save()
              .then(_caribouExchangeSaved => {
                // log('info', `Line 71: Caribou saved: ${caribouExchangeSaved}`, 'caribouController');
                success.push({ successMsg: 'You were added successfully' });
                return res.status(201).json({ email, uuId, avatarImage: userImage, success });
              })
              .catch(error => {
                log('error', `Error Saving new CaribouExchange Meeting: ${error}`, 'caribouController');
              });
          }
        });
      }
    });
  } catch (error) {
    log('error', `Error saving antler Exchange Caribou: ${error}`, 'antlerExchangeController');

    errors.push({ errorMsg: `Error Saving you to the Antler Exchange Secret Meetings. Please try Again.` });
    return res.status(400).json(errors);
  }
}

module.exports = { saveAntlerExchangeCaribou, getAntlerExchangeCaribous };
