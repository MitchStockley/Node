"use strict";

const Subscriber = require("../models/subscriber"); //require the subscribers mudule

exports.getAllSubscribers = (req, res) => { //rewrite the getallsubscribers action
  Subscriber.find({})
    .exec() //return a promise from the find quary
    .then(subscribers => { //send saved data to the next then code block
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    //catch errors that are rejected in the promise
    .catch(error => {
      console.log(error.message);
      return [];
    })
    //end promise chain with a log message 
    .then(() => {
      console.log("promise complete");
    });
};

//add an action to render the contact page
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

//add an action to save subscribers
exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode //creates a new subscriber
  });
  newSubscriber.save().then(result => { //save new subscriber with a promise return
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
