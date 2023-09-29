// Export a function to handle a request to display the "register" page
module.exports = (req, res) => {
    // Initialize variables for username and password
    var username = "";
    var password = "";

    // Check if there is data stored in the flash session (possibly from a previous registration attempt)
    const data = req.flash('data')[0];
    
    // If data exists in the flash session, extract the username and password
    if (typeof data != "undefined") {
        username = data.username;
        password = data.password;
    }

    // Render the "register" page with any validation errors and pre-filled username and password
    res.render('register', {
        errors: req.flash('validationErrors'), // Display validation errors if any
        username: username, // Pre-fill the username field
        password: password  // Pre-fill the password field
    });
}
