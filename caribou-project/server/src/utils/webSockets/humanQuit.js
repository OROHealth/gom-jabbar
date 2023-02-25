const log = require('../logger');
const mongoose = require('mongoose');

const socketIOHumanQuitHandler = io => {
  const listen = () => {
    log('info', `Listening for Human Quite`, 'index');

    mongoose.connection.once('open', () => {
      // Now I need to access the collection I will monitor for changes.
      const humanQuitChangeStream = mongoose.connection.collection('maps').watch();

      // Create a change stream by using Collection's watch()
      humanQuitChangeStream.on('change', change => {
        switch (change.operationType) {
          case 'delete':
            io.volatile.emit('human_quite_received_broadcast', { message: `Some Humans just quit a location` });
        }
      });
    });
  };

  return listen;
};

module.exports = { socketIOHumanQuitHandler };
