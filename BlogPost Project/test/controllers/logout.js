// Export a function to handle a logout request
module.exports = (req, res) => {
    // Destroy the user's session, effectively logging them out
    req.session.destroy(() => {
        // Redirect the user to the home page ("/") after the session is destroyed
        res.redirect('/');
    });
}
