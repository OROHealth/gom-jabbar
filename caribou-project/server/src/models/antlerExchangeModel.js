const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      trim: true,
    },
    uuId: {
      type: String,
      required: true,
      select: true,
    },
    expiresAt: { type: Date, expires: '24h', default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

mapSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('map', mapSchema);
