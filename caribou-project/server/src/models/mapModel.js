const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema(
  {
    x: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    y: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
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

module.exports = mongoose.model('Map', mapSchema);
