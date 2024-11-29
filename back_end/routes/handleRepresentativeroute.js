// routes/representativeRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Representative = require('../models/handleRepresentative'); // Adjust path as necessary
const router = express.Router();
 // Replace with environment variable in production

// 1. Create a Representative
router.post('/create', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the representative already exists
    const existingRep = await Representative.findOne({ email });
    if (existingRep) {
      return res.status(400).json({ message: 'Representative already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new representative
    const newRep = new Representative({
      name,
      email,
      password: hashedPassword,
      role: role || 'staff', // Default role is staff if not provided
    });

    // Save the representative
    await newRep.save();
    res.status(201).json({ message: 'Representative created successfully', representative: { name, email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 2. Login Representative
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("hi")
  console.log(email,password)
  

  try {
    // Find representative by email
    const representative = await Representative.findOne({ email });
    console.log("meees")
    if (!representative) {
      return res.status(404).json({ message: 'Representative not found' });
    }
    console.log(representative)
    console.log("1")
    // Verify password
    const isMatch = await bcrypt.compare(password, representative.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log("2")
    // Generate JWT
    const token = jwt.sign({ id: representative._id, role: representative.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log(representative.role)
    console.log("3")
    // Set the token in a cookie
    res.cookie('token', token, {maxAge: 24 * 60 * 60 * 1000 }); // 1-day expiration
    res.json({ message: 'Login successful', representative: { name: representative.name, email: representative.email } });
    console.log("4")
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// 3. Logout Representative
router.post('/logout', async (req, res) => {
  try {
    // Check for token in request headers or cookies
    const token = req.cookies.auth_token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token found. Please log in again.' });
    }

    // Verify token and extract user data
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token is invalid or expired' });
      }

      // Proceed with logging out (clear the token)
      res.clearCookie('auth_token');  // Clear the auth token from cookies
      res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to log out', error });
  }
});


router.get('/all', async (req, res) => {
  try {
    // Fetch all representatives from the database
    console.log("hi1")
    const representatives = await Representative.find(); // Adjust fields as needed

    // Respond with the representatives data
    res.status(200).json({ message: 'Representatives fetched successfully', representatives });
  } catch (error) {
    console.error('Error fetching representatives:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// 1. Edit Representative
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    // Find the representative by ID
    const representative = await Representative.findById(id);
    if (!representative) {
      return res.status(404).json({ message: 'Representative not found' });
    }

    // Update fields
    if (email) {
      representative.email = email;
    }
    if (password) {
      representative.password = await bcrypt.hash(password, 10);
    }

    // Save the updated representative
    await representative.save();
    res.status(200).json({ message: 'Representative updated successfully', representative });
  } catch (error) {
    console.error('Error updating representative:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// 2. Delete Representative
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the representative by ID and delete
    const representative = await Representative.findByIdAndDelete(id);
    if (!representative) {
      return res.status(404).json({ message: 'Representative not found' });
    }

    res.status(200).json({ message: 'Representative deleted successfully' });
  } catch (error) {
    console.error('Error deleting representative:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;