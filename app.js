'use strict';

var path = require("path");
// load modules
const express = require('express');
const morgan = require('morgan');
const routes=require('./routes')

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';


const users=require('./models/').User;
const courses=require('./models').Course;
// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
const dbModule = require("./models");
const sequelize = dbModule.sequelize;
const models = dbModule.models;


app.use(express.json());
app.use('/api',routes);

// use async and await to connect to the database

(async () => {
  try {
    // Test the connection to the database
    await sequelize.authenticate();
    console.log("Connection to the database successful!");

    // Sync the models
    console.log("Synchronizing the models with the database...");
    await sequelize.sync();
    console.log("Hello from the project");
  } catch (error) {
    console.log('Error Connection to the database:',error);
  }
})();









// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
module.exports = app;