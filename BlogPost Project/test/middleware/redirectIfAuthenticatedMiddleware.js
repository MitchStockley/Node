// Middleware function to check if a user is logged in
module.exports = (req, res, next) => {
    // If the user is logged in (session contains userId), redirect to the home page ("/")
    if (req.session.userId) {
        return res.redirect('/');
    }
    // If the user is not logged in, continue to the next middleware or route
    next();
};
