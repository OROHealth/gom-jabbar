const chatroomRouter = require('express').Router();
const { getRoomRouter, postRoomRouter, postRoomIdRouter } = require('../controllers/chatroomRouter');

// Base = '/api/v1/chatroom'

// @Desc    Gets all the chatrooms
// @Method  GET
// @Route   /api/v1/chatroom
chatroomRouter.get('/', getRoomRouter);

// good
// @Desc   post a chatroom Id
// @Method  POST
// @Route   /api/v1/chatroom/roomId
chatroomRouter.post('/roomId', postRoomIdRouter);

// @Desc    get the chat room based on the id
// @Method  GET
// @Route   /api/v1/chatroom/:roomId
chatroomRouter.get('/:roomId', postRoomRouter);

module.exports = chatroomRouter;
