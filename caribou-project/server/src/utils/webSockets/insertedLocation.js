const log = require('../logger');
const mongoose = require('mongoose');

const socketIOLocationAddedHandler = io => {
  const listen = () => {
    log('info', `Listening for Locations Added`, 'index');

    mongoose.connection.once('open', () => {
      // log('info', 'Line 11: Setting Up Change Stream! ...', 'setupDatabase');

      // Now I need to access the collection I will monitor for changes.
      const humanQuitChangeStream = mongoose.connection.collection('maps').watch();

      // Create a change stream by using Collection's watch()
      humanQuitChangeStream.on('change', change => {
        // log('info', 'Line 31: Change Stream Triggered!', 'setupDatabase');

        switch (change.operationType) {
          case 'insert':
            log('info', 'Line 35: Location Was added!', 'setupDatabase');

            io.emit('location_added_broadcast', { message: `New location added` });
          // io.on('connection', socket => {
          //   socket.on('location_added_broadcast', data => {
          //     socket.emit('location_added_broadcast', { message: `New location added` });
          //   });
          // });
        }
      });

      // log('info', 'Line 29: Finish Setting Up Change Stream!', 'setupDatabase');
    });
  };

  return listen;
};

module.exports = { socketIOLocationAddedHandler };
