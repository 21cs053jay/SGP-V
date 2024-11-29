const mongoose = require('mongoose');

// Base schema with common fields and timestamps
const baseOptions = {
  timestamps: true,
  versionKey: false
};

// Helper function to prevent duplicate entries
const uniqueValidator = async function(value) {
  const count = await this.constructor.countDocuments({
    [Object.keys(this.toObject())[0]]: value
  });
  return count === 0;
};

const QualificationSchema = new mongoose.Schema({
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true,
    validate: {
      validator: uniqueValidator,
      message: 'This qualification already exists'
    }
  }
}, baseOptions);

const StreamSchema = new mongoose.Schema({
  stream: {
    type: String,
    required: [true, 'Stream is required'],
    trim: true,
    validate: {
      validator: uniqueValidator,
      message: 'This stream already exists'
    }
  }
}, baseOptions);

const JobLocationSchema = new mongoose.Schema({
  State: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  City: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  }
}, {
  ...baseOptions,
  // Compound index for unique State-City combinations
  indexes: [
    {
      fields: { State: 1, City: 1 },
      unique: true
    }
  ]
});

const IndustryTypeSchema = new mongoose.Schema({
  industrytype: { // Use lowercase field name
    type: String,
    required: [true, 'Industry type is required'],
    trim: true,
    validate: {
      validator: uniqueValidator,
      message: 'This industry type already exists'
    }
  }
}, baseOptions);

const WorkAreaSchema = new mongoose.Schema({
  areaofwork: { // Use lowercase field name
    type: String,
    required: [true, 'Area of work is required'],
    trim: true,
    validate: {
      validator: uniqueValidator,
      message: 'This area of work already exists'
    }
  }
}, baseOptions);

// Add pre-save middleware to all schemas to standardize text
const standardizeText = function(next) {
  const doc = this;
  const field = Object.keys(doc.toObject())[0];
  if (doc[field] && typeof doc[field] === 'string') {
    doc[field] = doc[field].trim();
    // Capitalize first letter of each word
    doc[field] = doc[field]
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  next();
};

[QualificationSchema, StreamSchema, IndustryTypeSchema, WorkAreaSchema].forEach(schema => {
  schema.pre('save', standardizeText);
});

// Pre-save middleware for JobLocationSchema
JobLocationSchema.pre('save', function(next) {
  if (this.State) {
    this.State = this.State.trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  if (this.City) {
    this.City = this.City.trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  next();
});

const models = {
  qualification: mongoose.model('Qualification', QualificationSchema),
  stream: mongoose.model('Stream', StreamSchema),
  location: mongoose.model('Location', JobLocationSchema),
  industrytype: mongoose.model('IndustryType', IndustryTypeSchema),
  areaofwork: mongoose.model('WorkArea', WorkAreaSchema)
};

module.exports = models;