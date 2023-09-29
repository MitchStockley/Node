// Import required modules and controllers
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Import controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleware = require('./middleware/validateMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');

// Create an Express application
const app = new express();

// Set up static file serving and view engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(fileUpload());

// Set up sessions and flash messages
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use(flash());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded());

// Global variable to check if a user is logged in
global.loggedIn = null;

// Middleware to set the global loggedIn variable based on the user's session
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1/my_database', {
    useNewUrlParser: true
});

// Define routes and associate controllers
app.get('/posts/new', authMiddleware, newPostController);
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);

app.post('/posts/store', authMiddleware, storePostController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// Handle requests to non-existent routes
app.use((req, res) => res.render('notfound'));

// Start the application and listen on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000');
});
