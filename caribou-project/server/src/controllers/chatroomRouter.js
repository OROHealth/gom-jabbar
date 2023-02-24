const log = require('../utils/logger');
const UserModel = require('../models/userModel');
const AntlerExchangeModel = require('../models/antlerExchangeModel');

// Base = '/api/v1/chatroom'

const rooms = {};

// @Desc    Gets all the chatRooms
// @Method  GET
// @Route   /api/v1/chatroom
async function getRoomRouter(req, res) {
  console.log('Chat Rooms Found', req.body);
  return res.status(200).json(rooms);
}

// Good
// @Desc    To Create Chatroom a chatroom Id
// @Method  POST
// @Route   /api/v1/chatroom/roomId
async function postRoomIdRouter(req, res) {
  if (rooms[req.body.room] != null) {
    return res.status(400).json({ errorMsg: 'Room has already been created' });
  }
  console.log(req.body);
  rooms[req.body.room] = { users: {} };
}

// @Desc    get the specific room from the URL, get the chat room based on the id
// @Method  GET
// @Route   /api/v1/chatroom/:roomId
async function postRoomRouter(req, res) {}

module.exports = { getRoomRouter, postRoomRouter, postRoomIdRouter };
