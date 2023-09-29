"use strict";
//Listing 26.1 Moving user routes to userRoutes.js

//require expres.js and users controllers
const router = require("express").Router(),
  usersController = require("../controllers/usersController");
//add crud routes
router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post(
  "/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
//add login and authenticate routes
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);
//export the module router
module.exports = router;
