const log = require('../logger');

const socketIOChatMessageHandler = io => {
  const listen = () => {
    log('info', `Listening for Chat Messages`, 'index');

    io.on('connection', socket => {
      const rooms = {
        room: {
          users: {},
        },
      };
      // result looks like  ->  rooms { DCG9QTZRL9OG: { users: {} } }

      // socket.on('new_room_created', theCustomRoomNumber => {
      //   console.log('Line 12: New User', theCustomRoomNumber);
      //   socket.emit('user-connected', username); // emitting a user is connected
      // });

      // Signal the that a new User is connected to the chat - receives the username from data and the room
      socket.on('new-user', (room, data) => {
        console.log('Line 22: New User', data, 'Room:', room);
        // console.log('Line 23: Room:', room);
        // console.log('Line 24: UserName:', data.username);

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

        console.log('Line 42: Send Chat Message:', data);
        // Sending back the message and the users Name = { message: 'how u doing', username: 'giov' } User: giov
        socket.to(room).emit('chat_message_received_broadcast', { ...data });
      });

      // Signal the user is disconnected from the chat
      socket.on('disconnect', () => {
        // this will remove the user from all the rooms
        getUserRooms(socket).forEach(room => {
          // console.log('Line 47: User Disconnected');
          socket.to(room).emit('user-disconnected', rooms[room].users[socket.id]);
          delete rooms[room].users[socket.id]; // deleting the user from the object above
        });
      });
      // console.log('Line 52: Rooms', rooms);

      function getUserRooms(socket) {
        // This will check all the names and users and return the all the rooms that the user is apart of
        return Object.entries(rooms).reduce((names, [name, room]) => {
          if (room.users[socket.id] != null) {
            names.push(name);
          }
          return names;
        }, []);
      }
    });
  };

  return listen;
};

module.exports = { socketIOChatMessageHandler };
