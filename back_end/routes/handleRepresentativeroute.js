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

  try {
    // Find representative by email
    const representative = await Representative.findOne({ email });
    if (!representative) {
      return res.status(404).json({ message: 'Representative not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, representative.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: representative._id, role: representative.role }, JWT_SECRET, { expiresIn: '1d' });

    // Set the token in a cookie
    res.cookie('auth_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1-day expiration
    res.json({ message: 'Login successful', representative: { name: representative.name, email: representative.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 3. Logout Representative
router.post('/logout', (req, res) => {
  // Clear the auth_token cookie
  res.clearCookie('auth_token');
  res.json({ message: 'Logout successful' });
});

module.exports = router;