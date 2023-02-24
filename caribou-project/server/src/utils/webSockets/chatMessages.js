const log = require('../logger');

const socketIOChatMessageHandler = io => {
  const users = {};
  const rooms = {};

  const listen = () => {
    log('info', `Listening for Chat Messages`, 'index');

    io.on('connection', socket => {
      socket.on('new_room_created', theCustomRoomNumber => {
        console.log('Line 9: New User', theCustomRoomNumber);
        // socket.broadcast.emit('user-connected', username); // emitting a user is connected
      });

      // Signal the that a new User is connected to the chat
      socket.on('new-user', ({ username }) => {
        console.log('Line 9: New User', username);
        users[socket.id] = username; // receive the user sending
        socket.broadcast.emit('user-connected', username); // emitting a user is connected
      });

      // Listens for message and broadcast to the opposite sockets connected
      socket.on('send_chat_message', data => {
        console.log('Line 9: Chat Message', data);
        socket.broadcast.emit('chat_message_received_broadcast', data);
      });

      // Signal the user is disconnected from the chat
      socket.on('disconnect', () => {
        console.log('Line 9: User Disconnected');
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]; // deleting the user from the object above
      });
    });
  };

  return listen;
};

module.exports = { socketIOChatMessageHandler };
