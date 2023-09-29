"use strict";
//Listing 26.2 Importing all routes into index.js
//require express js router
const router = require("express").Router(),
//require all the router modules within the same directory
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");
//use routes from relative route modules with name spaces
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);
//export the router from index.js
module.exports = router;
