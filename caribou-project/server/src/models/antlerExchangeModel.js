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
    // myCustomTTLField: { type: Date },
    createdAt: { type: Date, immutable: true, default: () => Date.now() }, // by default it should be the current date
    updatedAt: { type: Date, immutable: true, default: () => Date.now() },
    expires: { type: Date, expires: '7200', default: Date.now },
  },
  {
    timestamps: true,
  }
);

// antlerExchangeSchema.path('myCustomTTLField').index({ expires: 7200 });

antlerExchangeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('AntlerExchange', antlerExchangeSchema);
