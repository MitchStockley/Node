// Import the required Mongoose library
const mongoose = require('mongoose');

// Create a Mongoose Schema for a BlogPost
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String, // Title of the blog post
    body: String, // Body content of the blog post
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Reference to the User model and it's a required field
    },
    datePosted: {
        type: Date,
        default: new Date() // Date when the blog post was created, defaults to the current date
    },
    image: String // URL or path to an associated image for the blog post
});

// Create a Mongoose model named 'BlogPost' based on the BlogPostSchema
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Export the BlogPost model to be used in other parts of the application
module.exports = BlogPost;
