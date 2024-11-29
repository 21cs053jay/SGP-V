const express = require('express');
const router = express.Router();
const Qualification = require('../models/Qualification');
const Stream = require('../models/Stream');
const Location = require('../models/Location');
const IndustryType = require('../models/IndustryType');
const AreaOfWork = require('../models/AreaOfWork');

const models = {
  qualification: Qualification,
  stream: Stream,
  location: Location,
  industrytype: IndustryType,
  areaofwork: AreaOfWork,
};

// Middleware to validate endpoint
const validateEndpoint = (req, res, next) => {
  const { endpoint } = req.params;
  console.log(endpoint)
  
  if (!models[endpoint]) {
    return res.status(400).json({ status: 'error', message: 'Invalid endpoint' });
  }
  req.model = models[endpoint];
  next();
};

// Get all items
router.get('/:endpoint', validateEndpoint, async (req, res) => {
  try {
    // console.log(req.model)
    const data = await req.model.find().sort({ createdAt: -1 });
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch data' });
  }
});

// Add a new item
router.post('/:endpoint', validateEndpoint, async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.model)
    const newItem = await req.model.create(req.body);
    res.status(201).json({ status: 'success', data: newItem });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error.code === 11000 ? 'This entry already exists' : 'Failed to add item';
    res.status(500).json({ status: 'error', message: errorMessage });
  }
});

// Delete an item by ID
router.delete('/:endpoint/:id', validateEndpoint, async (req, res) => {
  try {
    const deletedItem = await req.model.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }
    res.json({ status: 'success', message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete item' });
  }
});

module.exports = router;
