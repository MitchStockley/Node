// Import the User model
const User = require("../models/User");

// Middleware function to check user authentication
module.exports = (req, res, next) => {
    // Find a user by their userId stored in the session
    User.findById(req.session.userId, (error, user) => {
        // If there's an error or no user is found, redirect to the home page ("/")
        if (error || !user) {
            return res.redirect("/");
        }
        // If a user is found, continue to the next middleware or route
        next();
    });
};
