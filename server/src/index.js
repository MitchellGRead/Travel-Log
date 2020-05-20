/**
 * Main server driver.
 * Version 1.0.0
 * Mitchell Read
 */


// Import external libraries/dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');


// Import custom middlewars
const middlwares = require('./middlewares');


// Import API's
const logs = require('./api/log_entry');


// Init environment variables
require('dotenv').config({ path: `${__dirname}/.env` });


// Connect Mongoose DB
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGO_URI, dbOptions);


// Init external middlewares
const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/image_uploads', express.static(`${__dirname}/api/image_uploads`));


// Init logs api endpoint
app.use('/api/log_entry', logs);


// Init error middlewares (init these last)
app.use(middlwares.notFound);
app.use(middlwares.errorHandler);


// Connect server
const port = process.env.PORT || 1337;
const addr = process.env.SERVER_ADDR || 'localhost';
app.listen(port, () => {
  console.log(`Listening at http://${addr}:${port}`);
});