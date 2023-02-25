const log = require('../logger');
const mongoose = require('mongoose');

const socketIOChatMessageHandler = io => {
  const listen = () => {
    log('info', `Listening for Chat Messages`, 'index');

    io.on('connection', socket => {
      const rooms = {
        room: {
          users: {},
        },
      };

      // Signal the that a new User is connected to the chat - receives the username from data and the room
      socket.on('new-user', (room, data) => {
        console.log('Line 22: New User', data, 'Room:', room);

        socket.join(room);

        // Sets the room as the key and sets the users socket id as the key and their username as the value
        rooms[room] = { users: {} };
        rooms[room].users[socket.id] = data.username; // receive the user sending

        // Sending back the name of the user as an object
        socket.to(room).emit('username-of-user-connected', data); // emitting a user is connected
      });

      // Listens for message and broadcast to the opposite sockets connected
      socket.on('send_chat_message', (room, data) => {
        // The "data" contains the "message" that was send from the input and the username of the sender.

        socket.join(room);

        console.log('Line 42: Send Chat Message:', data, 'to:', room);
        // Sending back the message and the users Name = { message: 'how u doing', username: 'giov' } User: giov
        io.to(room).emit('chat_message_received_broadcast', data);
      });

      // Listening for updates
      mongoose.connection.once('open', () => {
        // Now I need to access the collection I will monitor for changes.
        const ChatMessageStream = mongoose.connection.collection('chatroommsgs').watch();

        // Create a change stream by using Collection's watch()
        ChatMessageStream.on('change', change => {
          switch (change.operationType) {
            case 'update':
              io.emit('messages_was_updated', { message: `messages_was_updated` });

            case 'insert':
              io.emit('messages_was_updated', { message: `messages_was_updated` });
          }
        });
      });
    });
  };

  return listen;
};

module.exports = { socketIOChatMessageHandler };
