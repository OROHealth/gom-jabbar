const log = require('../utils/logger');
const AntlerExchangeModel = require('../models/antlerExchangeModel');
const ChatroomMsgModel = require('../models/chatroomMsgModel');

// Base = '/api/v1/chatroom'

const rooms = {};
log('info', `Line 8:All Rooms Posted: ${rooms}`, 'chatroomRouter');

// Good
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
  log('info', `Line 24: Posting a chat room number: ${req.body.room}`, 'chatroomRouter');

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
    // log('info', `Line 40: posting Message ${roomId}, ${user}, ${message}`, 'chatroomRouter');

    await ChatroomMsgModel.find({ chatroomMsgId: roomId }).then(async result => {
      console.log('Finding messages -<>->', result.length);
      if (result.length < 1) {
        // If no message, Create one
        log('info', 'Line 46 in chatroom Router -> No ChatRooms Found', result);

        const newMessage = new ChatroomMsgModel({
          chatroomMsgId: roomId,
          sender: user,
        });

        newMessage.users.push(user);
        newMessage.messages.push(`${user}: ${message}`);

        await newMessage.save().then(savedMessage => {
          console.log('Line 50 in chatroom Router -> New Message Saves', savedMessage);
        });

        return res.status(201).json({ message: newMessage }).end();
      } else if (result.length > 0) {
        console.log('Finding messages -<>->');
        log('info', `Line 43 in chatroom Router -> Finding Chatroom `, 'chatroom router');
        // console.log(result);
        // log('info', `Line 61 in chatroom Router -> ChatRoom Found ${result}`, 'chatroom router');

        // If Room exist messages, Add to it
        const returnedUpdate = result.map(resultDB => {
          // console.log(`Line 61 in chatroom Router -> Sender`, resultDB);

          // Create a unique array of users
          const set1 = new Set();
          // console.log('usersResult', resultDB.users);
          set1.add(...resultDB.users);
          set1.add(user);
          // console.log('result.Users -> ', resultDB.users, set1); // creates a set

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
    const filter = { chatroomMsgId: messageId };
    const messagesFound = await ChatroomMsgModel.find({});

    const foundChat = messagesFound.map(item => {
      console.log('Item:', item.chatroomMsgId);
      console.log('Item message:', messageId);

      if (item.chatroomMsgId == messageId) {
        return res.status(200).json([{ chat: item }]);
      }
    });

    return res.status(200).json([{ chat: '' }]);
  } catch (error) {
    log('error', `Line 111: Error getting Messages: ${error}`, 'chatroomRouter');
  }
}

// @Desc     Display all Locations on the map
// @Method   GET
// @Route    /api/v1/map + /query=Map-Locations
async function getAllMapLocations(_req, res) {
  // populate, instead of showing the id, it will show the user name
  log('info', 'App Currently Getting all the Map Marker Locations in the Database', 'mapController');
  const locations = await MapModel.find({}).populate({ path: 'user', model: 'User' });
  log('info', 'Locations Found, Sent them to the Frontend :)', 'mapController');
  res.status(200).json({ locations });
  return;
}

module.exports = { getRoomRouter, postMessageRouter, postRoomIdRouter, getAllMsgs };
