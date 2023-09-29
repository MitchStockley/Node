// Export a function to handle a request to display a "create" page
module.exports = (req, res) => {
    // Check if a user is authenticated by verifying the presence of their session's userId
    if (req.session.userId) {
        // If the user is authenticated, render the "create" page with a flag to indicate it's for creating a post
        return res.render("create", {
            createPost: true,
        });
    }
    // If the user is not authenticated, redirect them to the login page ("/auth/login")
    res.redirect("/auth/login");
}
