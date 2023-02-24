const chatroomRouter = require('express').Router();
const { getRoomRouter, postMessageRouter, postRoomIdRouter, getAllMsgs } = require('../controllers/chatroomRouter');

// Base = '/api/v1/chatroom'

// good
// @Desc   post/create a chatroom Id
// @Method  POST
// @Route   /api/v1/chatroom/roomId
chatroomRouter.post('/roomId', postRoomIdRouter);

// @Desc   Post messages
// @Method  POST
// @Route   /api/v1/chatroom/message
chatroomRouter.post('/message', postMessageRouter);

// @Desc    get The specific message
// @Method  GET
// @Route   /api/v1/chatroom/:messageId
chatroomRouter.post('/:messageId', getAllMsgs);

// @Desc    Gets all the chatRooms
// @Method  GET
// @Route   /api/v1/chatroom
chatroomRouter.get('/', getRoomRouter);

module.exports = chatroomRouter;
