// const log = require('../logger');
// const mongoose = require('mongoose');

// const socketIOHumanQuitHandler = io => {
//   const listen = () => {
//     log('info', `Listening for caribou Adding to Secret Meeting Group`, 'index');

//     mongoose.connection.once('open', () => {
//       // Now I need to access the collection I will monitor for changes.
//       const addedToMeetingChangeStream = mongoose.connection.collection('antlerExchanges').watch();

//       // Create a change stream by using Collection's watch()
//       addedToMeetingChangeStream.on('change', change => {
//         switch (change.operationType) {
//           case 'insert':
//             io.volatile.emit('secret_meeting_received_broadcast', { message: `Caribou added to meeting` });
//         }
//       });
//     });
//   };

//   return listen;
// };

// module.exports = { socketIOAddedToMeetingHandler, socketIOHumanQuitHandler };
