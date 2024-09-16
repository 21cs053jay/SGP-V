const mongoose = require('mongoose');

const jobLocationSchema = new mongoose.Schema({
  state: { type: String, required: true },
  city: { type: String, required: true }
});

const salarySchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true }
});

const experienceSchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true }
});

const jobPostSchema = new mongoose.Schema({
  jid: { type: String, required: true },
  jobTitle: { type: String, required: true },
  keySkills: { type: String, required: true },
  qualification: { type: [String], required: true },
  stream: { type: String, required: true },
  companyName: { type: String, required: true },
  jobLocation: { type: jobLocationSchema, required: true },
  industryType: { type: [String], required: true },
  salary: { type: salarySchema, required: true },
  experience: { type: experienceSchema, required: true },
  jobDescription: { type: String, required: true },
  postedBy: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('JobPost', jobPostSchema);
