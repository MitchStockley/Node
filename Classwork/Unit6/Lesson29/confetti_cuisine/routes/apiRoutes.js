"use strict";
//Listing 29.5 Creating an API route in apiRoutes
const router = require("express").Router(),
  coursesController = require("../controllers/coursesController");

router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON //create route for the courses data endpoint
); 
//create a route to join a course by ID
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.use(coursesController.errorJSON);

module.exports = router;
