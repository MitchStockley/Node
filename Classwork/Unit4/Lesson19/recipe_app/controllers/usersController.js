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
    },

//Listing 19.2 Adding a create action to usersController.js
new: (req, res) => { //add the new action to render a form
    res.render("users/new");
},
    create: (req, res, next) => { //add the reate action to save the user to the database
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },//create users with form parameters
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        };
        User.create(userParams)
            .then(user => {
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                next(error);
            });
    }, //render the view in a seperate redirectView action
        redirectView: (req, res, next) => {
            let redirectPath = res.locals.redirect;
            if (redirectPath) res.redirect(redirectPath);
            else next();
        },
    //Listing 19.7 Show action for a specific user in usersController.js
    show: (req, res, next) => {
        let userId = req.params.id; //collect the users id from the request params
        User.findById(userId) //find user by id
        .then(user => {
        res.locals.user = user; //pass the user through the response object to the next middleware function
        next(); 
        })
        .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error); //log and pass errors to the next function
        });
        },
        showView: (req, res) => {
        res.render("users/show"); //render show view
        }
    };