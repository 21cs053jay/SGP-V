const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  stream: { type: String, required: true }
});

module.exports = mongoose.model('Stream', streamSchema);
