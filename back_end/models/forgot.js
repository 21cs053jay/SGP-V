// models/Admin.js
const mongoose = require('mongoose');
const forgotSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String }, // Temporary OTP for password reset
  otpExpiry: { type: Date } // OTP expiration time
});

module.exports = mongoose.model('forgot', forgotSchema);
