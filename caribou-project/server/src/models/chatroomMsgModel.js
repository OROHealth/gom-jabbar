const mongoose = require('mongoose');

const chatroomMsgSchema = new mongoose.Schema({
  chatroomMsgId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  sender: { type: String },
  users: [String],
  messages: [String],
  date: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  createdAt: { type: Date, immutable: true, default: () => Date.now() }, // by default it should be the current date
  updatedAt: { type: Date, immutable: true, default: () => Date.now() },
  expiresAt: { type: Date, expires: '5h', default: Date.now },
  antlerExchange: { type: mongoose.Schema.Types.ObjectId, ref: 'AntlerExchange' },
});

chatroomMsgSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 5 });

chatroomMsgSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('ChatroomMsg', chatroomMsgSchema);
