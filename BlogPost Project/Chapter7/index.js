const express = require('express')
const path = require('path');
const mongoose = require('mongoose')

const app = new express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())

const BlogPost = require('./models/BlogPost.js')

mongoose.connect('mongodb://127.0.0.1/my_database',
    { useNewUrlParser: true })

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})


app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.post('/posts/store', (req, res) => {
    console.log(req.files)
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error)=> {
        await BlogPost.create({
           title:req.body.title,
           body:req.body.body,
           username:req.body.username,
            image: '/img/' + image.name
        })
    res.redirect('/')
    })
})


app.listen(4000, () => {
    console.log('App listening on port 4000')
})

//pg 65