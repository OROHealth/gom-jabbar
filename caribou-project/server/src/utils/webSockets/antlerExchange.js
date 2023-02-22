const log = require('../logger');

const socketIOAntlerExchangeHandler = io => {
  const listen = () => {
    log('info', `Listening for Antler Exchange`, 'index');

    io.on('connection', socket => {
      socket.on('antler_exchange', data => {
        // console.log('Line 9: Antler Exchange', data);
        // socket.broadcast.emit('antler_exchange_broadcast', data);
        io.volatile.emit('antler_exchange_broadcast', data);
      });
    });
  };

  return listen;
};

module.exports = { socketIOAntlerExchangeHandler };
