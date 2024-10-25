// models/JobInfo.js
const mongoose = require('mongoose');

const QualificationSchema = new mongoose.Schema({
  qualification: { type: String, required: true },
});

const StreamSchema = new mongoose.Schema({
  stream: { type: String, required: true },
});

const JobLocationSchema = new mongoose.Schema({
  location: { type: String, required: true },
});

const IndustryTypeSchema = new mongoose.Schema({
  industryType: { type: String, required: true },
});

const WorkAreaSchema = new mongoose.Schema({
  areaofwork: { type: String, required: true },
});
module.exports = {
  qualification: mongoose.model('qualification', QualificationSchema),
  stream: mongoose.model('stream', StreamSchema),
  location: mongoose.model('location', JobLocationSchema),
  industryType: mongoose.model('industryType', IndustryTypeSchema),
  areaofwork: mongoose.model('areaofwork', WorkAreaSchema),
};

