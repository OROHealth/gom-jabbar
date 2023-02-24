const log = require('../utils/logger');
const UserModel = require('../models/userModel');
const AntlerExchangeModel = require('../models/antlerExchangeModel');

// Base = '/api/v1/chatroom'

const rooms = {};
log('info', `Line 8:All Rooms Posted: ${rooms}`, 'chatroomRouter');

// @Desc    Gets all the chatRooms
// @Method  GET
// @Route   /api/v1/chatroom
async function getRoomRouter(req, res) {
  log('info', `Line: 14: Sending all the chatRooms found ${req.body}`, 'chatroomRouter');
  return res.status(200).json(rooms);
}

// Good
// @Desc    To Create Chatroom a chatroom Id
// @Method  POST
// @Route   /api/v1/chatroom/roomId
async function postRoomIdRouter(req, res) {
  log('info', `Line 23: Posting a chat room number: ${req.body.room}`, 'chatroomRouter');

  if (rooms[req.body.room] != null) {
    return res.status(400).json({ errorMsg: 'Room has already been created' });
  }
  rooms[req.body.room] = { users: {} };
}

// @Desc    get the specific room from the URL, get the chat room based on the id
// @Method  GET
// @Route   /api/v1/chatroom/:roomId
async function postRoomRouter(req, res) {}

log('info', `Line 36: All Rooms Posted: ${rooms}`, 'chatroomRouter');

module.exports = { getRoomRouter, postRoomRouter, postRoomIdRouter };
