const express=require('express')
const router=express.Router();

const users = require("./models/").User;
const courses = require("./models").Course;
const { authenticateUser } = require("./middleware/auth-user");
const { asyncHandler } = require("./middleware/async-handler");


router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = await req.currentUser;
    res.json(user);
  })
);

  
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



router.post(
  "/courses/",
  authenticateUser,
  asyncHandler(async (req, res) => {
    /*Create a new course, set the Location
   header to the URI for the newly created course,
  and return a 201 HTTP status code and no content.*/

  try{
    let course = req.body;
    if (!course) {
      res.status(400).res.jon({ message: "New Course info was invalid" });
    } else {
      newCourse = await courses.create(course);
      newId = await newCourse.id;
      const location = `/courses/${newId}`;

      res.location(location).status(201).end();
    }
  }catch(err){
    if (err.name === "SequelizeValidationError") {
      //res.json(`
      //  ${err.name}:
      //${err.type}
      //${err.message}
      //`);
      res.json(err);
    } else {
      next(err);
    }


  }})


 
);
   


 /*
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = await req.currentUser;
    res.json(user);
  })
);
*/

router.put("/courses/:id",authenticateUser, asyncHandler(async (req, res) => {
  /*
  Update the corresponding course and return a 2
  4 HTTP status code and no content.
  */
  course =  await courses.findByPk(req.params.id);
  if(!course){
    res.status(500).json({message:'No course found'});
  }
  else{
  course.update(req.body);
    res.status(204).end();

  }}
))




// Delete routes


router.delete(
  "/courses/:id/delete",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course = courses.findByPk(req.params.id);
  if (course) {
    course.then((courseInfo) => {
      courses.destroy(course);
      res.status(204).end();
    })
  }
  })
);



module.exports=router;