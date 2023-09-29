"use strict";
/*To get these routes accessible in main.js, I create a new file called index.js
in the routes folder. This file requires all relevant routes so that they can be accessed in
one place. Then I’ll require index.js in main.js */

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes"),
  apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
