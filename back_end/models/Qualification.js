const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
  qualification: { type: String, required: true }
});

module.exports = mongoose.model('Qualification', qualificationSchema);
