module.exports = (req, res) =>{ //Checks if the user is logged in before creating a post, if not they are redirected to the login page
    if(req.session.userId){
    return res.render("create");
}
res.redirect('/auth/login')
} 