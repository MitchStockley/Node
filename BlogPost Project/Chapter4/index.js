const express = require('express')
const path = require('path') //setting up homepage route
const app = new express()
//To use ejs in pur app
const ejs = require('ejs')
app.set('view engine','ejs') //we tell express to use EJS as our templating engine, any file ending in ejs should be rendered with the ejs package.
app.use(express.static('public')) //public folder for serving static files
app.listen(4000, () => {
    console.log("App listening on port 4000")
})


//we send a view to a user using res.render//express adds the render method to the response object
app.get('/', (req,res) => {
    res.render('index'); //looks in views folder for the file index.ejs
})

app.get('/about',(req,res) => {
    res.render('about');
})

app.get('/contact',(req,res) => {
    res.render('contact');
})
app.get('/post',(req,res) => {
    res.render('post');
})