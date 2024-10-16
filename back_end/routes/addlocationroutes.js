const express = require("express");
const { Qualification, Stream, JobLocation, IndustryType, AreaOfWork } = require("../models/addlocation");

const router = express.Router();

// Qualification routes
router.get("/qualifications", async (req, res) => {
  const qualifications = await Qualification.find();
  res.json(qualifications);
});

router.post("/qualifications", async (req, res) => {
  const newQualification = new Qualification(req.body);
  await newQualification.save();
  res.json({ message: "Qualification added successfully" });
});

// Stream routes
router.get("/streams", async (req, res) => {
  const streams = await Stream.find();
  res.json(streams);
});

router.post("/streams", async (req, res) => {
  const newStream = new Stream(req.body);
  await newStream.save();
  res.json({ message: "Stream added successfully" });
});

// Job Location routes
router.get("/joblocations", async (req, res) => {
  const jobLocations = await JobLocation.find();
  res.json(jobLocations);
});

router.post("/joblocations", async (req, res) => {
  const newJobLocation = new JobLocation(req.body);
  await newJobLocation.save();
  res.json({ message: "Job Location added successfully" });
});

// Industry Type routes
router.get("/industrytypes", async (req, res) => {
  const industryTypes = await IndustryType.find();
  res.json(industryTypes);
});

router.post("/industrytypes", async (req, res) => {
  const newIndustryType = new IndustryType(req.body);
  await newIndustryType.save();
  res.json({ message: "Industry Type added successfully" });
});

// Area of Work routes
router.get("/areasofwork", async (req, res) => {
  const areasOfWork = await AreaOfWork.find();
  res.json(areasOfWork);
});

router.post("/areasofwork", async (req, res) => {
  const newAreaOfWork = new AreaOfWork(req.body);
  await newAreaOfWork.save();
  res.json({ message: "Area of Work added successfully" });
});

module.exports = router;
