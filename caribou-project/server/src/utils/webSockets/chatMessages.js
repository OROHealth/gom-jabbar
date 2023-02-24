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
        // console.log('Line 23: Room:', room);

        socket.join(room);

        // Sets the room as the key and sets the users socket id as the key and their username as the value
        rooms[room] = { users: {} };
        rooms[room].users[socket.id] = data.username; // receive the user sending

        // Sending back the name of the user as an object
        socket.to(room).emit('username-of-user-connected', data); // emitting a user is connected
      });

      // Listens for message and broadcast to the opposite sockets connected
      socket.on('send_chat_message', (room, data) => {
        console.log('Line 38: Received Message', data, 'Room:', room);
        // The "data" contains the "message" that was send from the input and the username of the sender.

        socket.join(room);

        console.log('Line 42: Send Chat Message:', data, 'to:', room);
        // Sending back the message and the users Name = { message: 'how u doing', username: 'giov' } User: giov
        io.to(room).emit('chat_message_received_broadcast', data);
      });

      // Signal the user is disconnected from the chat
      // socket.on('disconnect', () => {
      //   // this will remove the user from all the rooms
      //   getUserRooms(socket).forEach(room => {
      //     // console.log('Line 47: User Disconnected');
      //     socket.to(room).emit('user-disconnected', rooms[room].users[socket.id]);
      //     delete rooms[room].users[socket.id]; // deleting the user from the object above
      //   });
      // });

      // Listening for updates
      mongoose.connection.once('open', () => {
        // log('info', 'Line 11: Setting Up Change Stream! ...', 'setupDatabase');

        let updateOps = {
          $match: {
            $and: [{ 'updateDescription.updatedFields.messages': { $gte: 1 } }, { operationType: 'update' }],
          },
        };

        // Now I need to access the collection I will monitor for changes.
        const ChatMessageStream = mongoose.connection.collection('chatroommsgs').watch([updateOps]);

        // Create a change stream by using Collection's watch()
        ChatMessageStream.on('change', change => {
          // log('info', 'Line 31: Change Stream Triggered!', 'setupDatabase');
          switch (change.operationType) {
            case 'update':
              // io.emit('location_added_broadcast', { message: `New location added` });
              io.volatile.emit('messages_was_updated', { message: `messages_was_updated` });
          }
        });

        // log('info', 'Line 29: Finish Setting Up Change Stream!', 'setupDatabase');
      });
      // console.log('Line 52: Rooms', rooms);

      // function getUserRooms(socket) {
      //   // This will check all the names and users and return the all the rooms that the user is apart of
      //   return Object.entries(rooms).reduce((names, [name, room]) => {
      //     if (room.users[socket.id] != null) {
      //       names.push(name);
      //     }
      //     return names;
      //   }, []);
      // }
    });
  };

  return listen;
};

module.exports = { socketIOChatMessageHandler };
