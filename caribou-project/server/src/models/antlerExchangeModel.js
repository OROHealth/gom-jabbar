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
    expiresAt: { type: Date, expires: '4m', default: Date.now },
  },
  {
    timestamps: true,
  }
);

antlerExchangeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('antlerExchange', antlerExchangeSchema);
