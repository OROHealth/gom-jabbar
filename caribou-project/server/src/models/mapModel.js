const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    range: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
    },
    x: {
      type: String,
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
    label: {
      type: String,
      required: false,
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
