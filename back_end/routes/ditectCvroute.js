const express = require('express');
const multer = require('multer');
const DirectCv = require('../models/DirectCv');
const router = express.Router();
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Store files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Route to handle form submission
router.post('/', upload.single('cvFile'), async (req, res) => {
  try {
    const newCv = new DirectCv({
      ...req.body,
      cvFilePath: req.file ? req.file.path : null,
    });
    await newCv.save();
    res.status(201).json({ message: 'CV submitted successfully' });
  } catch (error) {
    console.error('Error saving CV:', error);
    res.status(400).json({ message: 'Failed to submit CV' });
  }
});

// Route to retrieve submitted CVs
router.get('/', async (req, res) => {
  try {
    const cvs = await DirectCv.find();
    res.json(cvs);
  } catch (error) {
    console.error('Error retrieving CVs:', error);
    res.status(500).json({ message: 'Failed to retrieve CVs' });
  }
});

// Route to download CV
router.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.download(filePath);
});

module.exports = router;
