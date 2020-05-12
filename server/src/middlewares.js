/**
 * Custom middlewares
 * Verison 1.0.0
 * Mitchell Read
 */
require('dotenv').config({ path: `${__dirname}/.env `});


// For catching page not found errors and showing the url used.
const notFound = (req, res, next) => {
  const error = new Error(`404 Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}


/*
For handling errors.
If it was successful but still recieved error then it is determined to be server side.
Prints error stack in development mode
*/
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
  });
};


// Export middlewares
module.exports = {
  notFound, 
  errorHandler,
}