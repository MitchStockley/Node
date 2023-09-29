//validates the input from the user
//if the input fields are empty, redirect to /post/new
module.exports = (req,res,next)=>{
    if(req.files == null || req.body.title == null ){
    return res.redirect('/posts/new')
    }
    next()
    }