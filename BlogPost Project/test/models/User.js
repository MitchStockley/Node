// Import required Mongoose library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import bcrypt for password hashing and mongoose-unique-validator for unique username validation
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

// Create a Mongoose Schema for a User
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true, // Ensures that each username must be unique in the database
        required: [true, "Please provide a username"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    }
});

// Apply the uniqueValidator plugin to enforce unique usernames
UserSchema.plugin(uniqueValidator);

// Before saving a new user in the database, hash their password
UserSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        user.password = hash; // Set the hashed password in the user object
        next();
    });
});

// Create a Mongoose model named 'User' based on the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
