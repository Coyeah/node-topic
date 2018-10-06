const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/topic', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sponsor: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model('Topic', topicSchema);
