"use strict";

const router = require("express").Router(),
  coursesController = require("../controllers/coursesController");
//route to handle requests made for the current user to join a course. 
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.use(coursesController.errorJSON);

module.exports = router;
