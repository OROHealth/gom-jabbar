const mongoose = require('mongoose');
// const mapSchema = require('./mapModel');
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      min: [6, 'Must be at least 6, got {VALUE}'],
      required: true,
      select: true,
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
    mapMarkers: {
      type: [
        {
          lat: String,
          lng: String,
        },
      ],
      default: [
        {
          lat: '',
          lng: '',
        },
      ],
      select: true,
    },
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'map' }],
  },
  {
    timestamps: true,
  }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('user', userSchema);
