const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
  customer: String,
  waiter: String,
  item: String,
  rating: Number,
  comment: String,
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
