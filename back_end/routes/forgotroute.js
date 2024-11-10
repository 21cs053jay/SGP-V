const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Representative=require("../models/handleRepresentative")
require('dotenv').config();

const algorithm = 'aes-256-cbc';
const encryptionKey = process.env.ENCRYPTION_KEY; // Must be 32 characters for AES-256
const iv = crypto.randomBytes(16); // Initialization vector

// Nodemailer setup 
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const generateOTP = () => crypto.randomInt(100000, 999999).toString();
const getOtpExpiry = () => Date.now() + 5 * 60 * 1000; // 5 minutes

// Encrypt OTP
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt OTP
function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Route for Forgot Password (Send OTP)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    // Generate OTP and encrypt it
    const otp = generateOTP();
    const encryptedOtp = encrypt(otp);
    const otpExpiry = getOtpExpiry();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`
    });

    // Set encrypted OTP and expiry in cookies
    res.cookie('otp', encryptedOtp, { httpOnly: true, maxAge: 5 * 60 * 1000 });
    res.cookie('otpExpiry', otpExpiry, { httpOnly: true, maxAge: 5 * 60 * 1000 });

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP, please try again.' });
  }
});

// Route for Verify OTP
router.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
    console.log("hi")
  try {
    // Retrieve and decrypt OTP from cookies
    const encryptedOtp = req.cookies.otp;
    const otpExpiry = req.cookies.otpExpiry;
    
    if (!encryptedOtp || !otpExpiry || Date.now() > otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    console.log(encryptedOtp)

    const decryptedOtp = decrypt(encryptedOtp);

    console.log(decryptedOtp)

    // Check if provided OTP matches decrypted OTP
    if (decryptedOtp === otp) {
      // Clear OTP cookies after successful verification
      res.clearCookie('otp');
      res.clearCookie('otpExpiry');
      return res.status(200).json({ message: 'OTP verified' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.log("hi2")
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP, please try again.' });
  }
});

// Route for Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await Representative.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password, please try again.' });
  }
});

// Route to Verify Email (for checking existence in DB)
router.post("/verify", async (req, res) => {
  const { email } = req.body;
  try {
    const existingRep = await Representative.findOne({ email });
    if (existingRep) {
      return res.status(200).json({ message: 'Mail exists' });
    } else {
      return res.status(400).json({ message: "Mail does not exist" });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Error verifying email, please try again.' });
  }
});

module.exports = router;
