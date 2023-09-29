// Import required modules
const BlogPost = require('../models/BlogPost.js');
const path = require('path');

// Export a function to handle a request to create a new blog post
module.exports = (req, res) => {
    // Extract the uploaded image from the request
    let image = req.files.image;

    // Move the uploaded image to the appropriate directory
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        // Create a new blog post using data from the request
        await BlogPost.create({
            title: req.body.title, 
            body: req.body.body,
            username: req.body.username,
            image: '/img/' + image.name, // Store the path to the uploaded image
            userid: req.session.userId // Associate the post with the current user
        });

        // Redirect the user to the home page after the post is created
        res.redirect('/');
    });
}
