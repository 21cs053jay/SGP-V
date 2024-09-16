// backend/routes/jobPostRoutes.js
const express = require('express');
const router = express.Router();
const JobPost = require('../models/jobposted')

// Route to get all job posts
router.get('/jobPost', async (req, res) => {
  try {
    const jobPosts = await JobPost.find(); // Fetch all job posts from MongoDB
    res.json(jobPosts); // Send response back to the client
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ message: "Error fetching job posts" });
  }
});

module.exports = router;
