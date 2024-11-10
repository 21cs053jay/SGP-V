// models/Representative.js
const mongoose = require('mongoose');


const representativeSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['Representative'],
      required: true,
      default: 'Represntative',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Representative', representativeSchema);