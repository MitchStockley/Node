const mongoose = require('mongoose')
//import BlogPost model by specifying its relative path. BlogPost represents the BlogPosts collection in the db
const BlogPost = require('/models/BlogPost')

//connect to the db. If it doesnt exist it will be created.
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

//create a new BlogPost document in our db with create
BlogPost.create({
title: 'The Mythbuster Guide to Saving Money on Energy Bills',
body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thriftynerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:'
}, (error, blogpost) =>{
console.log(error,blogpost)
})

BlogPost.find({}, (error, blogspot) =>{
    console.log(error,blogspot)
    });

BlogPost.find({
    title:'The Mythbuster’s Guide to Saving Money on Energy Bills'
    }, (error, blogspot) =>{
    console.log(error,blogspot)
    });

BlogPost.find({
    title:/The/}, (error, blogspot) =>{
    console.log(error,blogspot)
    });

var id = "64fed504b2c81e0da4820dba";

BlogPost.findByIdAndUpdate(id,{
    title:'Updated title'
    }, (error, blogspot) =>{
    console.log(error,blogspot)
    })

// var id = "5cb436980b33147489eadfbb";
// BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
//     console.log(error,blogspot)
//     })