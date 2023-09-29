"use strict";

const Course = require("../models/course"),
  httpStatus = require("http-status-codes"),
  User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    Course.find({})
      .then(courses => {
        res.locals.courses = courses;
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("courses/index");
  },
  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = {
      title: req.body.title,
      description: req.body.description,
      items: [req.body.items.split(",")],
      zipCode: req.body.zipCode
    };
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = {
        title: req.body.title,
        description: req.body.description,
        items: [req.body.items.split(",")],
        zipCode: req.body.zipCode
      };

    Course.findByIdAndUpdate(courseId, {
      $set: courseParams
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  //Listing 27.2 Adding JSON responses for courses in coursesController.js
  respondJSON: (req, res) => { //handle requests from previous middleware and submit responses
    res.json({
      status: httpStatus.OK,
      data: res.locals //responds with the responses local data in Json format
    });
  },
  errorJSON: (error, req, res, next) => { //respond with the error status codes messages in json format
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  //Listing 27.6 Creating an action to join a course in coursesController.js
  join: (req, res, next) => { //add the join action to let users join a course 
    let courseId = req.params.id,
      currentUser = req.user; //get the course id and current user from the request. 
    if (currentUser) { //check if a current user is logged in.
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          courses: courseId //update the users courses field to contain the targeted courses
        }
      })
        .then(() => {
          res.locals.success = true; //respond with a json object with a success indicator
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("User must log in.")); //pass an error though to the next middleware function
    }
  },
  //Listing 27.7 Adding an action to filter courses in coursesController.js
  filterUserCourses: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) { //check if user is logged in
      let mappedCourses = res.locals.courses.map(course => { //add a flag to indicate user association
        let userJoined = currentUser.courses.some(userCourse => {
          return userCourse.equals(course._id);//check whether the courses exist in the users courses array.
        });
        return Object.assign(course.toObject(), { joined: userJoined });
      });
      res.locals.courses = mappedCourses;
      next();
    } else {
      next();
    }
  }
};
