// Import the BlogPost model, which presumably represents blog post data.
const BlogPost = require("../models/BlogPost.js");

// Export an asynchronous function to handle the request.
module.exports = async (req, res) => {
    // Use the BlogPost model to find a blog post by its unique identifier (req.params.id).
    // Additionally, populate the 'userid' field, likely fetching user data associated with this blog post.
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    
    // Log the fetched blog post to the console for debugging purposes.
    console.log(blogpost);
    
    // Render the "post" view/template and pass in the fetched blog post as data.
    res.render("post", {
        blogpost,
    });
};
