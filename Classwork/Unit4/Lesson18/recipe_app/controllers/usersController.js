//Listing 18.9 Creating the index action in usersController.js

const User = require("../models/user"); //require the users model
module.exports = {
    index: (req, res, next) => {
        User.find() //run the quary in index action only
            .then(users => { 
                res.locals.users = users; //store the user data on the next response and call the next middleware function
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`); //log error msg and redirect to the home page
                next(error); //catch errors, pass to next middleware function
            });
    },
    indexView: (req, res) => {
        res.render("users/index");//render view in seperate action
    }
};