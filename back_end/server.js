const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const JobPost = require('./models/jobposted');
const jobPostRoutes = require('./routes/jobpostedroutes');
require('dotenv').config();
// const router = express.Router();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Admin Model
const Admin = mongoose.model('Admin', adminSchema);

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Admin Login Route
app.post('/admin/login', async (req, res) => {
  const { adminId, password } = req.body;

  try {
    let admin = await Admin.findOne({ adminId });

    // If admin not found, create a default admin
    if (!admin) {
      const defaultAdminId = 'admin';
      const defaultPassword = 'admin';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      admin = new Admin({
        adminId: defaultAdminId,
        password: hashedPassword,
      });

      await admin.save();
      console.log('Default admin created:', adminId);
    }

    // Verify password for the found or newly created admin
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('Authorization', token).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Change Password Route (No authentication required for this use case)
app.post('/admin/changepassword', async (req, res) => {
  const { adminId, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    return res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign Out Route
app.post('/admin/signout', authenticateAdmin, async (req, res) => {
  const { _id } = req.admin;

  try {
    // Remove the admin from the database
    await Admin.deleteOne({ _id });

    res.json({ message: 'Signed out Successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/jobPost', async (req, res) => {
  try {
    const newJob = new JobPost(req.body); // Create new job from request body
    await newJob.save(); // Save to MongoDB
    res.status(201).json({ message: 'Job posting created successfully!' });
  } catch (error) {
    console.error('Error creating job posting:', error);
    res.status(500).json({ error: 'Failed to create job posting.' });
  }
});

app.use('/api', jobPostRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
