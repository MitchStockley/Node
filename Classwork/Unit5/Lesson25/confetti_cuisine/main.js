"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController.js"),
  usersController = require("./controllers/usersController.js"),
  coursesController = require("./controllers/coursesController.js"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  expressValidator = require("express-validator"),
  connectFlash = require("connect-flash"),
  User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(layouts);
router.use(express.static("public"));
router.use(expressValidator());
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

router.use(cookieParser("secretCuisine123")); //configure cookieParser with a secret key.
router.use(
  expressSession({
    secret: "secretCuisine123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());
//configure express.js to initialize and use passport
router.use(passport.initialize());
router.use(passport.session()); //instruct passport to use sessions
passport.use(User.createStrategy()); //default login strategy set up
passport.serializeUser(User.serializeUser());//set up password to compact,encrypt and decrypt user data
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();//set up loggedin variable to reflect passport login status
  res.locals.currentUser = req.user; //set up the currentUser variable to reflect a logged in user
  res.locals.flashMessages = req.flash(); //assign flash messages to a local variable
  next();
});

router.get("/", homeController.index);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
//Listing 25.2 Adding a login route to main.js
router.get("/users/login", usersController.login); //route to the log in action
router.post("/users/login", usersController.authenticate);//send posted data to an authenticate actionq
router.get("/users/logout", usersController.logout, usersController.redirectView);//add a route to logout and redirect a view
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
