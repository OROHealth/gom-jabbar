const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema(
  {
    labelName: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    trashingLevel: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
    },
    y: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    x: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    expiresAt: { type: Date, expires: '1h', default: Date.now },
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
