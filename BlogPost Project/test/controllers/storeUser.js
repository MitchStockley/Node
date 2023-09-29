// Import required modules
const User = require("../models/User.js");
const path = require("path");

// Export a function to handle a user registration request
module.exports = (req, res) => {
  // Create a new user in the database using data from the request body
  User.create(req.body, (error, user) => {
    if (error) {
      // If there are validation errors, extract and store them as flash messages
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.flash('validationErrors', validationErrors); // Store validation errors in flash messages
      req.flash('data', req.body); // Store the user's input data in flash messages

      // Redirect the user back to the registration page with validation errors
      return res.redirect("/auth/register");
    }

    // If user registration is successful, redirect the user to the home page
    res.redirect("/");
  });
};
