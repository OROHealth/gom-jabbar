const log = require('../utils/logger');
const ChatroomMsgModel = require('../models/chatroomMsgModel');

// Base = '/api/v1/chatroom'

const rooms = {};
// log('info', `Line 8:All Rooms Posted: ${rooms}`, 'chatroomRouter');

// Good
// @Desc    Gets all the chatRooms
// @Method  GET
// @Route   /api/v1/chatroom
async function getRoomRouter(req, res) {
  return res.status(200).json(rooms);
}

// Good
// @Desc    To Create Chatroom a chatroom Id
// @Method  POST
// @Route   /api/v1/chatroom/roomId
async function postRoomIdRouter(req, res) {
  // if room doesn't equal null, that means the room was already created
  if (rooms[req.body.room] != null) {
    return res.status(400).json({ errorMsg: 'Room has already been created' });
  }

  rooms[req.body.room] = { users: {} };
}

// @Desc    get the specific room from the URL, get the chat room based on the id
// @Method  Post chatroom messages
// @Route   /api/v1/chatroom/message
async function postMessageRouter(req, res) {
  const { roomId, user, message } = req.body;

  try {
    await ChatroomMsgModel.find({ chatroomMsgId: roomId }).then(async result => {
      if (result.length < 1) {
        // If no message, Create one

        const newMessage = new ChatroomMsgModel({
          chatroomMsgId: roomId,
          sender: user,
        });

        newMessage.users.push(user);
        newMessage.messages.push(`${user}: ${message}`);

        await newMessage.save().then(savedMessage => {});

        return res.status(201).json({ message: newMessage }).end();
      } else if (result.length > 0) {
        // If Room exist messages, Add to it
        const returnedUpdate = result.map(resultDB => {
          // Create a unique array of users
          const set1 = new Set();
          set1.add(...resultDB.users);
          set1.add(user);

          // update the specific places
          const update = {
            sender: user,
            users: [...set1],
            messages: [...resultDB.messages, `${user}: ${message}`],
          };

          return update;
        });
        console.log('returnedUpdate', returnedUpdate);

        const filter = { chatroomMsgId: roomId };
        let doc = await ChatroomMsgModel.findOneAndUpdate(filter, ...returnedUpdate, { new: true });

        return res.status(201).json({ message: doc });
      }
    });
  } catch (error) {
    log('error', Error, 'chatroomRouter');
  }
}

// @Desc    Get all messages
// @Method  GET chatroom messages
// @Route   /api/v1/chatroom/:messageId
async function getAllMsgs(req, res) {
  const { messageId } = req.body;
  log('info', `Line 105: Message Id: ${messageId}`, 'chatroomRouter');
  try {
    const messagesFound = await ChatroomMsgModel.find({});
    let found = false;
    let theItem = null;
    const foundChat = messagesFound.map(item => {
      if (item.chatroomMsgId == messageId) {
        return (theItem = item);
      }
      found = true;
    });

    return res.status(200).json([theItem]).end();
  } catch (error) {
    log('error', `Line 115: Error getting Messages: ${error}`, 'chatroomRouter');
  }
}

module.exports = { getRoomRouter, postMessageRouter, postRoomIdRouter, getAllMsgs };
