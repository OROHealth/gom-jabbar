const log = require('../logger');
const mongoose = require('mongoose');

const socketIOHumanQuitHandler = io => {
  const listen = () => {
    log('info', `Listening for Human Quite`, 'index');

    mongoose.connection.once('open', () => {
      log('info', 'Line 11: Setting Up Change Stream! ...', 'setupDatabase');

      // Now I need to access the collection I will monitor for changes.
      const humanQuitChangeStream = mongoose.connection.collection('maps').watch();

      // Create a change stream by using Collection's watch()
      humanQuitChangeStream.on('change', change => {
        // log('info', 'Line 31: Change Stream Triggered!', 'setupDatabase');

        switch (change.operationType) {
          case 'delete':
            log('info', 'Line 35: Location Was deleted!', 'setupDatabase');
            io.emit('human_quite_received_broadcast', { message: `Some Humans just quit a location` });
        }
      });

      // log('info', 'Line 29: Finish Setting Up Change Stream!', 'setupDatabase');
    });
  };

  return listen;
};

module.exports = { socketIOHumanQuitHandler };
