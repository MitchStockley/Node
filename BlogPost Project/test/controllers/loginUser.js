// Import required modules
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Export a function to handle a login request
module.exports = (req, res) => {
    // Extract the username and password from the request body
    const { username, password } = req.body;

    // Use the User model to find a user by their username
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            // If a user with the provided username exists, compare the provided password
            // with the hashed password stored in the user object
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    // If the passwords match, set the user's session ID and redirect to the home page ("/")
                    req.session.userId = user._id;
                    res.redirect("/");
                } else {
                    // If the passwords don't match, redirect to the login page ("/auth/login")
                    res.redirect("/auth/login");
                }
            });
        } else {
            // If no user with the provided username is found, redirect to the login page ("/auth/login")
            res.redirect("/auth/login");
        }
    });
}
