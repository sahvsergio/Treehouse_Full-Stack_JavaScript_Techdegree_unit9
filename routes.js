const express=require('express')
const router=express.Router();

const users = require("./models/").User;
const courses = require("./models").Course;


router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

router.get("/users", (req, res) => {
  /*returns all properties and values for 
 the currently authenticated
  User along with a 200 HTTP status code.
   */
  res.status(200);
});

router.get("courses", (req, res, next) => {
  /*

  Return all courses including the User object
   associated with each course and a 200 HTTP status code.
  */
  let allCourses = courses.findAll();
  allCourses
    .then((coursesInfo) => {
      res.status(200);
      res.json({ coursesInfo });
    })
    .catch((err) => {
      console.error;
    });
});

router.get("/courses/:id", (req, res) => {
  /* Return the corresponding course including the User object associated 
  with that course and a 200 HTTP status code.
  */
  let course = courses.findByPk(req.params.id);
  if (course) {
    course.then((courseInfo) => {
      res.status(200);
      res.json({ courseInfo });
    })
  }
});

//Post Routes

router.post("/users", (req, res, next) => {
  /*This route should create a new user, 
  set the Location header to "/", 
  and return a 201 HTTP status code and no content.*/
  users.create(req.body).then((newUser)=>{
    res.location('/').status(201)


  }).catch((err)=>{
    res.location('/').status(400);
    if (err.name==='SequelizeValidationError'){
      
      //res.json(`
        //  ${err.name}:
        //${err.type}
       //${err.message}
      //`);
      res.json(err);
     
    }
    else{
      next(err);
    }
  });
})





router.post("/courses/", (req, res, next) => {
  /*Create a new course, set the Location
   header to the URI for the newly created course,
  and return a 201 HTTP status code and no content.*/
});

router.put("/courses/:id", (req, res, next) => {
  /*
  Update the corresponding course and return a 2
  4 HTTP status code and no content.
  */
  course = courses.findByPk(req.params.id);
  course.then((updatedCourse) => {
    updatedCourse.update(req.body);
    res.status(204).end();
  });
});

module.exports=router;