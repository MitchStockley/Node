const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (error, user) => {
    if (user) { //the user is there on the db
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // if passwords match
          // store user session, will talk about it later

          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};
