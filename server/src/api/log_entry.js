/**
 * Log entry router api endpoint
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');

// Import custom libraries/dependencies
const LogEntry = require('../models/LogEntry');


// Init multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/image_uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // TODO: change this?
  },
});
const upload = multer({ storage: storage });

// Init routes
const router = Router();


// Get from base path sends all log entries in the database
router.get('/get_entries', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
})


// Adds an entry to the database
// This recieves a FormData object, uses multer to parse it
router.post('/add_entry', upload.array('images'), async (req, res, next) => {
  try {
    req.body.images = req.files.map(file => file.filename);
    req.body.visitDate = new Date(req.body.visitDate);

    const logEntry = new LogEntry(req.body);    
    const createdEntry = await logEntry.save();
    
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});


// Deletes an entry by its mongo _id from the database and its correspondign images
// This recieves a JSON object and utilizes express.json() middleware
router.post('/delete_entry', async (req, res, next) => {
  try {
    // Delete the images
    req.body.images.forEach(image => {
      fs.unlink(`${__dirname}/image_uploads/${image}`, (error) => {
        if (error) {
          console.log(`${image} - ${error}`);
        }
      });
    })
    
    // Delete database entry
    const entry = await LogEntry.findByIdAndDelete(req.body._id);
    res.json(entry);    
  } catch (error) {
    next(error);
  }
});


// Edits an entry by its mongo _id from the database with new data sent via the body
// This recieves a FormData object, uses multer to parse it
router.post('/edit_entry', upload.array('images'), async (req, res, next) => {
  try {
    req.body.visitDate = new Date(req.body.visitDate);
    
    const entry = await LogEntry.findByIdAndUpdate(req.body._id, req.body, { useFindAndModify: false });
    res.json(entry);
  } catch (error) {
    next(error);
  }
})


// Export router
module.exports = router;