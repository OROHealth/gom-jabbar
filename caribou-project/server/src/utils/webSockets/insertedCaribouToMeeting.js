const log = require('../logger');
const mongoose = require('mongoose');

const socketIOHumanQuitHandler = io => {
  const listen = () => {
    log('info', `Listening for caribou Adding to Secret Meeting Group`, 'index');

    mongoose.connection.once('open', () => {
      // log('info', 'Line 11: Setting Up Change Stream! ...', 'setupDatabase');

      // Now I need to access the collection I will monitor for changes.
      const addedToMeetingChangeStream = mongoose.connection.collection('antlerExchanges').watch();

      // Create a change stream by using Collection's watch()
      addedToMeetingChangeStream.on('change', change => {
        // log('info', 'Line 31: Change Stream Triggered!', 'setupDatabase');

        switch (change.operationType) {
          case 'insert':
            // log('info', 'Line 35: Location Was deleted!', 'setupDatabase');
            io.volatile.emit('secret_meeting_received_broadcast', { message: `Caribou added to meeting` });
        }
      });

      // log('info', 'Line 29: Finish Setting Up Change Stream!', 'setupDatabase');
    });
  };

  return listen;
};

module.exports = { socketIOAddedToMeetingHandler };
