const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
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
  createdAt: { type: Date, immutable: true, default: () => Date.now() }, // by default it should be the current date
  updatedAt: { type: Date, immutable: true, default: () => Date.now() },
  expiresAt: { type: Date, expires: '5h', default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

mapSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 5 });

mapSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Map', mapSchema);
