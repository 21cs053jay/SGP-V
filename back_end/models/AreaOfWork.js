const mongoose = require('mongoose');

const areaOfWorkSchema = new mongoose.Schema({
  areaofwork: { type: String, required: true }
});

module.exports = mongoose.model('AreaOfWork', areaOfWorkSchema);
