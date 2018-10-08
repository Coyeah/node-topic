const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/topic', {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  tid: {
    type: String,
    required: true,
  },
  reviewer: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_time: {
    type: Date,
    default: Date.now,
  },
  last_modified_time: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Comment', commentSchema);
