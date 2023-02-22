const log = require('../logger');

const socketIOChatMessageHandler = io => {
  const users = {};

  const listen = () => {
    log('info', `Listening for Chat Messages`, 'index');

    io.on('connection', socket => {
      // Signal the that a new User is connected to the chat
      socket.on('new-User', name => {
        users[socket.id] = name; // receive the user sending
        socket.broadcast.emit('user-connected', name); // emitting a user is connected
      });
      // Listens for message and broadcast to the opposite sockets connected
      socket.on('send_chat_message', data => {
        console.log('Line 9: Chat Message', data);
        socket.broadcast.emit('chat_message_received_broadcast', data);
      });

      // Signal the user is disconnected from the chat
      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]; // deleting the user from the object above
      });
    });
  };

  return listen;
};

module.exports = { socketIOChatMessageHandler };
