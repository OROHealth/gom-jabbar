const mongoose = require('mongoose');

const antlerExchangeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      trim: true,
    },
    avatarImage: {
      type: String,
      required: true,
      select: true,
    },
    uuId: {
      type: String,
      required: true,
      select: true,
    },
    customRoomNumber: {
      type: String,
      required: true,
      select: true,
    },
    createdAt: { type: Date, immutable: true, default: () => Date.now() }, // by default it should be the current date
    updatedAt: { type: Date, immutable: true, default: () => Date.now() },
    expiresAt: { type: Date, expires: '2h', default: Date.now },
  }
  // {
  //   timestamps: true,
  // }
);

antlerExchangeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 60 });

antlerExchangeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('AntlerExchange', antlerExchangeSchema);
