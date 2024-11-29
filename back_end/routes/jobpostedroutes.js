// // backend/routes/jobPostRoutes.js
// // hii
// const express = require('express');
// const router = express.Router();
// const JobPost = require('../models/jobposted')

// // Route to get all job posts
// router.get('/jobPost', async (req, res) => {
//   try {
//     const jobPosts = await JobPost.find(); // Fetch all job posts from MongoDB
//     res.json(jobPosts); // Send response back to the client
//   } catch (error) {
//     console.error("Error fetching job posts:", error);
//     res.status(500).json({ message: "Error fetching job posts" });
//   }
// });

// module.exports = router;

// backend/routes/jobPostRoutes.js
const express = require('express');
const router = express.Router();
const JobPost = require('../models/jobposted'); // Ensure correct model path and naming

// Route to get all job posts
router.get('/jobPosts', async (req, res) => { 
  try {
    const jobPosts = await JobPost.find(); // Fetch all job posts from MongoDB
    res.json(jobPosts); // Send response back to the client
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ message: "Error fetching job posts" });
  }
});

// Route to get job post by jid
router.get('/jobPosts/:jid', async (req, res) => {
  const { jid } = req.params; // Extract jid from the request parameters

  try {
    const jobPost = await JobPost.findOne({ jid }); // Fetch job post by jid from MongoDB
    if (!jobPost) {
      return res.status(404).json({ message: `Job post with jid ${jid} not found` });
    }
    res.json(jobPost); // Send response back to the client
  } catch (error) {
    console.error(`Error fetching job post with jid ${jid}:`, error);
    res.status(500).json({ message: `Error fetching job post with jid ${jid}` });
  }
});

// Route to add a new job post
router.post('/addJobPosting', async (req, res) => {
  const answer = req.body;
  console.log(answer);
  try {
    // Destructure the request body
    const {
      jid,
      jobTitle,
      keySkills,
      qualification,
      stream,
      companyName,
      jobLocation,
      industryType,
      salary,
      experience,
      jobDescription,
      postedBy,
      phoneNumber,
      email,areaOfWork
    } = req.body;

    // Create a new job post instance
    const jobPost = new JobPost({
      jid,
      jobTitle,
      keySkills,
      qualification,
      stream,
      companyName,
      jobLocation,
      industryType,
      salary,
      experience,
      jobDescription,
      postedBy,
      phoneNumber,
      email,
      areaOfWork
    });

    // Save the job post to the database
    await jobPost.save();

    res.status(201).json({ message: 'Job post created successfully', jobPost });
  } catch (error) {
    console.error('Error saving job post:', error);
    res.status(500).json({ error: 'Failed to create job post' });
  }
});

module.exports = router;
