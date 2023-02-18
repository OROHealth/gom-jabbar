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
    excitementLevel: {
      type: Number,
      required: false,
      unique: false,
      trim: true,
    },
    y: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    x: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
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

// mapSchema.pre('save', next => {
//   try {
//     expirationTime = '24h';
//   =
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

module.exports = mongoose.model('map', mapSchema);
