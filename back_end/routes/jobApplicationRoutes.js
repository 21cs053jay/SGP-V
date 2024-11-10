  // const express = require('express');
  // const multer = require('multer');
  // const path = require('path');
  // const fs = require('fs');
  // const JobApplication = require('../models/jobApplication');
  //  // Assuming you have a JobApplication model

  // const router = express.Router();

  // // Storage configuration for resume uploads
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     const uploadPath = 'uploads/resumes';
  //     if (!fs.existsSync(uploadPath)) {
  //       fs.mkdirSync(uploadPath, { recursive: true });
  //     }
  //     cb(null, uploadPath);
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
  //   },
  // });

  // const upload = multer({
  //   storage: storage,
  //   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  // });

  // // Endpoint to handle job application submissions
  // router.post('/submitApplication', upload.single('resume'), async (req, res) => {
  //   try {
  //     // Get the form data from the request body
  //     const jobDetails = JSON.parse(req.body.jobDetails);

  //     // Store the form data along with the resume file path
  //     const newApplication = new JobApplication({
  //       fullName: jobDetails.fullName,
  //       dob: jobDetails.dob,
  //       qualification: jobDetails.qualification,
  //       experience: jobDetails.experience,
  //       presentEmployer: jobDetails.presentEmployer,
  //       industry: jobDetails.industry,
  //       presentSalary: jobDetails.presentSalary,
  //       functionalRole: jobDetails.functionalRole,
  //       presentLocation: jobDetails.presentLocation,
  //       locationPreference: jobDetails.locationPreference,
  //       mobile: jobDetails.mobile,
  //       email: jobDetails.email,
  //       applyFor: jobDetails.applyFor,
  //       resume: req.file.path, // Save the resume path
  //     });

  //     // Save the application in the database
  //     await newApplication.save();

  //     res.status(200).json({ message: 'Application submitted successfully!' });
  //   } catch (error) {
  //     console.error('Error submitting application:', error);
  //     res.status(500).json({ message: 'Error submitting application.' });
  //   }
  // });


  // // GET Endpoint to fetch all job applications
  // router.get('/jobapplications', async (req, res) => {
  //     try {
  //       const applications = await JobApplication.find();
  //       res.status(200).json(applications);
  //     } catch (error) {
  //       console.error('Error fetching applications:', error);
  //       res.status(500).json({ message: 'Error fetching applications.' });
  //     }
  //   });
    
  //   // GET Endpoint to fetch a specific job application by ID
  //   router.get('/jobapplications/:id', async (req, res) => {
  //     try {
  //       const application = await JobApplication.findById(req.params.id);
  //       if (!application) {
  //         return res.status(404).json({ message: 'Application not found.' });
  //       }
  //       res.status(200).json(application);
  //     } catch (error) {
  //       console.error('Error fetching application:', error);
  //       res.status(500).json({ message: 'Error fetching application.' });
  //     }
  //   });
    

  // module.exports = router;


  const express = require('express');
  const multer = require('multer');
  const mongoose = require('mongoose');
  const Grid = require('gridfs-stream');
  const { GridFsStorage } = require('multer-gridfs-storage');
  const JobApplication = require('../models/jobApplication'); // Assuming JobApplication schema exists

  const router = express.Router();

  // MongoDB connection string
  const mongoURI = 'mongodb+srv://mananshah737:Manan63@cluster0.jmlzi.mongodb.net/AdminDB?retryWrites=true&w=majority';

  // Initialize GridFS
  let gfs;
  const conn = mongoose.connection;
  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('resumes'); // Collection where resumes will be stored
  });

  // GridFS storage configuration for multer
  const storage = new GridFsStorage({
    db: conn, // Use the existing mongoose connection instead of the URL
    file: (req, file) => {
      return {
        bucketName: 'resumes', // Files will be stored in the 'resumes' bucket
        filename: `${Date.now()}-${file.originalname}`, // Define filename
      };
    },
    options: { useUnifiedTopology: true }, // Add options to avoid deprecated warnings
  });

  const upload = multer({ storage });

  // POST Endpoint to handle job application submissions
  router.post('/submitApplication', upload.single('resume'), async (req, res) => {
    try {
      // Parse job details from the request body
      const jobDetails = JSON.parse(req.body.jobDetails);

      // Create new job application with resume's GridFS file ID
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
        resumeFileId: req.file.id, // Store the GridFS file ID for the resume
      });

      // Save application to the database
      await newApplication.save();

      res.status(200).json({ message: 'Application submitted successfully!' });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ message: 'Error submitting application.' });
    }
  });

  // GET Endpoint to fetch all job applications
  router.get('/jobapplications', async (req, res) => {
    try {
      const applications = await JobApplication.find();
      res.status(200).json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Error fetching applications.' });
    }
  });

  // GET Endpoint to fetch resume file by ID from GridFS
  router.get('/resumes/:id', async (req, res) => {
    try {
      const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

      if (!file || file.length === 0) {
        return res.status(404).json({ message: 'Resume not found.' });
      }

      // If file exists, check if it's a resume (by MIME type)
      if (file.contentType === 'application/pdf' || file.contentType === 'application/msword' || file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Create a read stream and pipe the file to the response
        const readStream = gfs.createReadStream({ _id: file._id });
        readStream.pipe(res);
      } else {
        res.status(400).json({ message: 'Not a valid resume format.' });
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      res.status(500).json({ message: 'Error fetching resume.' });
    }
  });

  module.exports = router;
