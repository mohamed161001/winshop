const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
