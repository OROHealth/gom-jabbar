const log = require('../logger');

const socketIOChatMessageHandler = io => {
  const listen = () => {
    log('info', `Listening for Chat Messages`, 'index');

    io.on('connection', socket => {
      socket.broadcast.emit('chat-message', data => {
        // console.log('Line 9: Antler Exchange', data);
        // socket.broadcast.emit('antler_exchange_broadcast', data);
        io.volatile.emit('antler_exchange_broadcast', data);
      });
    });
  };

  return listen;
};

module.exports = { socketIOChatMessageHandler };
