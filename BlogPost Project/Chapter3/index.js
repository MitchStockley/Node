const express = require('express')
const path = require('path') //setting up homepage route
const app = new express()
app.use(express.static('public')) //public folder for serving static files
app.listen(4000, () => {
    console.log("App listening on port 4000")
})

app.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

//routes for about,contact and sample

app.get('/about',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})
app.get('/contact',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})
app.get('/post',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

