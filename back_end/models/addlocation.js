const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Qualification Schema
const qualificationSchema = new Schema({
  qualification: { type: String, required: true },
});

// Stream Schema
const streamSchema = new Schema({
  stream: { type: String, required: true },
});

// Job Location Schema
const jobLocationSchema = new Schema({
  state: { type: String, required: true },
  city: { type: String, required: true },
});

// Industry Type Schema
const industryTypeSchema = new Schema({
  industryType: { type: String, required: true },
});

// Area of Work Schema
const areaOfWorkSchema = new Schema({
  areaOfWork: { type: String, required: true },
});

// Models
const Qualification = mongoose.model("Qualification", qualificationSchema);
const Stream = mongoose.model("Stream", streamSchema);
const JobLocation = mongoose.model("JobLocation", jobLocationSchema);
const IndustryType = mongoose.model("IndustryType", industryTypeSchema);
const AreaOfWork = mongoose.model("AreaOfWork", areaOfWorkSchema);

module.exports = {
  Qualification,
  Stream,
  JobLocation,
  IndustryType,
  AreaOfWork,
};
