const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const JobApplication = require('../models/jobApplication');

const router = express.Router();

// MongoDB connection string
const mongoURI = 'mongodb+srv://mananshah737:Manan63@cluster0.jmlzi.mongodb.net/AdminDB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

let gfsBucket;

conn.once('open', () => {
  console.log('MongoDB connected successfully.');
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'resumes',
  });
});

// Multer storage configuration for resume uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST Endpoint to handle job application submissions
router.post('/submitApplication', upload.single('resume'), async (req, res) => {
  try {
    const jobDetails = JSON.parse(req.body.jobDetails);

    const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    // Write the file buffer to GridFS
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', async () => {
      try {
        // Save job application with GridFS file ID
        const newApplication = new JobApplication({
          fullName: jobDetails.fullName,
          dob: jobDetails.dob,
          qualification: jobDetails.qualification,
          experience: jobDetails.experience,
          presentEmployer: jobDetails.presentEmployer,
          industry: jobDetails.industry,
          presentSalary: jobDetails.presentSalary,
          functionalRole: jobDetails.functionalRole,
          presentLocation: jobDetails.presentLocation,
          locationPreference: jobDetails.locationPreference,
          mobile: jobDetails.mobile,
          email: jobDetails.email,
          applyFor: jobDetails.applyFor,
          resumeFileId: uploadStream.id, // Use the `id` property of the uploadStream
        });

        await newApplication.save();

        res.status(200).json({ message: 'Application submitted successfully!' });
      } catch (saveError) {
        console.error('Error saving application:', saveError);
        res.status(500).json({ message: 'Error saving application.' });
      }
    });

    uploadStream.on('error', (uploadError) => {
      console.error('Error uploading resume to GridFS:', uploadError);
      res.status(500).json({ message: 'Error uploading resume.' });
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application.' });
  }
});

router.get('/jobapplications', async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications.' });
  }
});


// GET Endpoint to fetch resumes by ID
router.get('/resumes/:id', async (req, res) => {
  try {
    const downloadStream = gfsBucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.id) // Use 'new' to create an ObjectId instance
    );

    downloadStream.on('data', (chunk) => res.write(chunk));
    downloadStream.on('end', () => res.end());
    downloadStream.on('error', (error) => {
      console.error('Error downloading resume:', error);
      res.status(404).json({ message: 'Resume not found.' });
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Error fetching resume.' });
  }
});


module.exports = router;
