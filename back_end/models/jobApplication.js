const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  presentEmployer: { type: String, required: false },
  industry: { type: String, required: false },
  presentSalary: { type: Number, required: false },
  functionalRole: { type: String, required: false },
  presentLocation: { type: String, required: false },
  locationPreference: { type: String, required: false },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  applyFor: { type: String },
  resumeFileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to GridFS file
}, { timestamps: true });

module.exports = mongoose.model('jobApplication', jobApplicationSchema);
