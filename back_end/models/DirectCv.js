const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  fullName: String,
  dob: String,
  qualification: String,
  experience: String,
  presentLocation: String,
  locationPreference: String,
  mobile: String,
  email: String,
  presentDesignation: String,
  presentEmployer: String,
  industryType: String,
  presentSalary: String,
  functionalRole: String,
  cvFilePath: String,
});

module.exports = mongoose.model('DirectCv', cvSchema);
