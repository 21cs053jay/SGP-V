//npm install multer
//npm install multer-gridfs-storage gridfs-stream mongoose --legacy-peer-deps



const express = require('express');;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const JobPost = require('./models/jobposted');
const jobPostRoutes = require('./routes/jobpostedroutes');
const jobApplicationRoutes=require('./routes/jobApplicationRoutes')
const jobInfoRoutes=require('./routes/jobinforoutes')
// const jobApplication=require('./models/jobApplication')
const Representativeroutes=require('./routes/handleRepresentativeroute')
const Representative=require("./models/handleRepresentative")
const forgotroute=require('./routes/forgotroute')
require('dotenv').config();
const cookieParser=require("cookie-parser")
const directCvRoutes=require('./routes/ditectCvroute')
// const router = express.Router();
const path = require('path');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
  // useNewUrlParser: true, useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


  const fs = require("fs");
const { log } = require('console');

app.get("/api/resumes/:resumeFileId", (req, res) => {
  const { resumeFileId } = req.params;
  const filePath = path.join(__dirname, "uploads", `${resumeFileId}.pdf`); // Adjust file path as needed

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist");
      return res.status(404).send("File not found");
    }

    res.setHeader("Content-Disposition", `attachment; filename=resume-${resumeFileId}.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    fs.createReadStream(filePath).pipe(res);
  });
});


// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Admin Model
const Admin = mongoose.model('Admin', adminSchema);

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {

  console.log("maai")
  // Access token from cookies
  const token = req.cookies.token; // Assuming the token is stored under 'auth_token' key
  
  if (!token) {
    console.log("nai thaayu")
    return res.status(401).send('Access Denied');
  }

  try {
    // Verify the JWT token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded admin info to the request
    req.admin = verified;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // If token is invalid or expired
    res.status(400).send('Invalid Token');
  }
};

// Admin Login Route
app.post('/admin/login', async (req, res) => {
  const { email, password,role} = req.body;
  console.log(req.body)
  try {
    let admin = await Admin.findOne({ email });
    console.log(admin)
    // If admin not found, create a default admin
    if (!admin) {
      console.log("Hi")
      const defaultAdminEmail = 'admin@gmail.com';
      const defaultPassword = 'admin';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
  
      admin = new Admin({
        email: defaultAdminEmail,
        password: hashedPassword,
      });
      console.log("mmmmmm")
      await admin.save();
      console.log('Default admin created:', email);
    }
  
    // Verify password for the found or newly created admin
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  
    // Generate JWT token
    const token = jwt.sign({ _id: admin._id , role:role}, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Done")
    console.log(token)
    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {  // Makes the cookie accessible only by the web server
       // Sends the cookie only over HTTPS in production
      maxAge: 3600000  // 1 hour in milliseconds
    });
  
    // Send response indicating successful login
    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Change Password Route (No authentication required for this use case)
app.post('/admin/changepassword', async (req, res) => {
  // const { email, newPassword } = req.body;

  // try {
  //   const admin = await Admin.findOne({ email });
  //   if (!admin) return res.status(400).json({ message: 'Admin not found' });

  //   const hashedPassword = await bcrypt.hash(newPassword, 10);
  //   admin.password = hashedPassword;
  //   await admin.save();

  //   return res.json({ message: 'Password changed successfully' });
  // } catch (err) {
  //   res.status(500).json({ message: 'Server error' });
  // }
  const { adminEmail, newPassword } = req.body;

  // Check if token is present in cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  
  try {
    // Verify token and extract user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded; // Extract `id` and `role` from token payload
    console.log(role)
    console.log(id)
    // Determine model based on role
    let user;
    if (role === 'admin') {
      user = await Admin.findOne({email:adminEmail}); // Find admin by ID from token
    } else if (role === 'representative') {
      user = await Representative.findOne({email:adminEmail}); // Find representative by ID from token
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }
  
    // If user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    // Update password
    user.password = hashedPassword;
    await user.save();
  
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Sign Out Route
app.post('/admin/signout', authenticateAdmin, async (req, res) => {
  console.log("bye")
  try {
    console.log("hi")
    // Clear the authentication cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
    });

    res.json({ message: 'Signed out successfully.' });
  } catch (err) {
    console.log("my")
    console.error('Error during signout:', err);
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


app.use('/api/apply', jobApplicationRoutes);
app.use('/api/jobInfo', jobInfoRoutes);
app.use('/api/directcv', directCvRoutes);

app.use('/api/forgot',forgotroute);
app.use('/api/handleRepresentative',Representativeroutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/handleRepresentative',handleRepresentativeRoute)
app.use('/api/jobPost', jobPostRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
