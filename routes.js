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



  
router.get("/courses", async (req, res, next) => {
  /*

  Return all courses including the User object
   associated with each course and a 200 HTTP status code.
  */
   let allCourses= await courses.findAll({include:{
    model:users
   }});
   res.status(200).json(allCourses).end()
   


  })


  

router.get("/courses/:id", (req, res) => {
  /* Return the corresponding course including the User object associated 
  with that course and a 200 HTTP status code.
  */
  let course = courses.findByPk(req.params.id, {include:{
    model:users,
    attributes:['firstName','lastName', 'emailAddress']
  }
  })
  
 
  if (course) {
    course.then((courseInfo) => {
      res.status(200);
      res.json(courseInfo )})
    }
    })



//Post Routes

router.post("/users", async(req, res, next) => {
  /*This route should create a new user, 
  set the Location header to "/", 
  and return a 201 HTTP status code and no content.*/
  await users.create(req.body).then((newUser)=>{
    res.location('/').status(201).end()


  }).catch((err)=>{
    res.location('/').status(400);
    if (err.name==='SequelizeValidationError'){
      const errors = err.errors.map((err) => err.message);

      //res.json(`
      //  ${err.name}:
      //${err.type}
      //${err.message}
      //`);
      res.json({"errors":errors}).end();
    }
    else{
      next(err);
    }
  });
})



router.post(
  "/courses/",authenticateUser,
  
 async (req, res,next) => {
    /*Create a new course, set the Location
   header to the URI for the newly created course,
  and return a 201 HTTP status code and no content.*/
  try{


    let course = await req.body;
   
    if (!course) {
      
      res.status(400).res.json({ message: "New Course info was invalid" });
    } else {
      
      newCourse = await courses.create(course);
      newId = await newCourse.id;
      const location = `/courses/${newId}`;

      res.location(location).status(201).end();
    

  }
}
  catch(err){
    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((err) => err.message);
      

      //res.json(`
      //  ${err.name}:
      //${err.type}
      //${err.message}
      //`);
      res.status(400).json({ errors: errors }).end();
    } else {
      next(err);
    }

  }

 
  })





router.put("/courses/:id",authenticateUser, asyncHandler(async (req, res,next) => {
  /*
  Update the corresponding course and return a 2
  4 HTTP status code and no content.
  */
  try{
  course =  await courses.findByPk(req.params.id);
  if(!course){
    res.status(404).json({message:'No course found'});
  }
  else{
   await course.update(req.body);
    res.status(204).end();

  }}
catch(err){
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((err) => err.message);
    //res.json(`
    //  ${err.name}:
    //${err.type}
    //${err.message}
    //`);
    res.status(400).json({"errors":errors}).end();
  } else {
    next(err);
  }

}
}))

// Delete routes
router.delete("/courses/:id",
  authenticateUser,
  asyncHandler(async(req,res)=>{
    let course=await courses.findByPk(req.params.id)
    await course.destroy();
    res.status(204).end();
}))



















module.exports=router;