const BlogPost = require("../models/BlogPost.js");
module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate('userid'); //automatically references the specified document with the userid in the collection
  console.log(req.session)
  res.render("index", {
    blogposts,
  });
};
