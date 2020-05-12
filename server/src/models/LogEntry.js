/**
 * Mongoose log entry database schema
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Custom schema types
const requiredString = {
  type: String, 
  required: true, 
};

const requiredNumber = {
  type: Number, 
  required: true,
};


// Log entry schema definition
const logEntrySchema = new Schema({
  title: requiredString,
  comment: String, 
  images: [String],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 5,
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

// Export schema
const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = LogEntry;