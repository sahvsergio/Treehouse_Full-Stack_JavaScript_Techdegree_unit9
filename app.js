'use strict';

var path = require("path");
// load modules
const express = require('express');
const morgan = require('morgan');

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
    console.log(error);
  }
})();



app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  }
);
});

app.get('/api/users',(req, res)=>{  



 

 /*returns all properties and values for 
 the currently authenticated
  User along with a 200 HTTP status code.
   */
 
 
  

    res.status(200);
 
 
});

app.get('/api/courses',(req, res)=>{
  /*

  Return all courses including the User object
   associated with each course and a 200 HTTP status code.
  */
   let allCourses=courses.findAll();
   allCourses.then((coursesInfo)=>{
     res.status(200);
     res.json({coursesInfo})

   }).catch((err)=>{
 
   }

)
 

})
 
     
  




app.get('/api/courses/:id',(req, res)=>{
  /*

  Return the corresponding course including the User object associated 
  with that course and a 200 HTTP status code.
  */
  let course=courses.findByPk(req.params.id);
  if(course){
 course.then((courseInfo)=>{
  res.status(200);
  res.json({courseInfo});
 })
}

 })


 


app.post("/api/users", (req, res) => {
  /*This route should create a new user, 
  set the Location header to "/", 
  and return a 201 HTTP status code and no content.*/
  res.status(201);
  res.json({ user });
});

app.post('/api/courses', (req, res)=>{

  /*Create a new course, set the Location
   header to the URI for the newly created course,
  and return a 201 HTTP status code and no content.*/

  res.status(201)
})



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
