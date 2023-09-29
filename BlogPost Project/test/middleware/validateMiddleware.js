// Middleware function to check if required data is present in the request
module.exports = (req, res, next) => {
    // Check if either files or title is not present in the request
    if (req.files == null || req.body.title == null) {
        // If data is missing, redirect the user to the new post creation page ("/posts/new")
        return res.redirect('/posts/new');
    }
    // If the required data is present, continue to the next middleware or route
    next();
};
