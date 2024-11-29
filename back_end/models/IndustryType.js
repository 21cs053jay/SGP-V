const mongoose = require('mongoose');

const industryTypeSchema = new mongoose.Schema({
  industrytype: { type: String, required: true }
});

module.exports = mongoose.model('IndustryType', industryTypeSchema);
