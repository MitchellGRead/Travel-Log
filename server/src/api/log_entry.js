/**
 * Log entry router api endpoint
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
const { Router } = require('express');
const multer = require('multer');

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


// Deletes an entry by its mongo _id from the database
router.post('/delete_entry', async (req, res, next) => {
  try {
    const entry = await LogEntry.findByIdAndDelete(req.body.deleteEntryId);
    res.json(entry);    
  } catch (error) {
    next(error);
  }
});


// Updates an entry by its mongo _id from the database with new data sent via the body
router.post('/update_entry', async (req, res, next) => {
  try {
    const entry = await LogEntry.findByIdAndUpdate(req.body._id, req.body, { useFindAndModify: false });
    res.json(entry);
  } catch (error) {
    next(error);
  }
})


// Export router
module.exports = router;