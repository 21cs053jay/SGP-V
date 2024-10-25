// routes/jobInfo.js
const express = require('express');
const router = express.Router();
const { qualification, stream, location, industryType, areaofwork } = require('../models/jobInfo');

// Utility function to create routes for each category
const createRoutesForModel = (model, path) => {
  router.get(`/${path}`, async (req, res) => {
    try {
      const data = await model.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post(`/${path}`, async (req, res) => {
    const newItem = new model(req.body);
    try {
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

createRoutesForModel(qualification, 'qualification');
createRoutesForModel(stream, 'stream');
createRoutesForModel(location, 'location');
createRoutesForModel(industryType, 'industryTypes');
createRoutesForModel(areaofwork, 'areaofwork');

module.exports = router;
