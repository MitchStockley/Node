
//Listing 21.11 Adding subscriber controller actions in subscribersController.js
const Subscriber = require("../models/subscriber"),
  getSubscriberParams = body => { //create a custom function to pull subscriba data from the request
    return {
      name: body.name,
      email: body.email,
      zipCode: parseInt(body.zipCode)
    };
  };

module.exports = {
  index: (req, res, next) => { //create the index action to find all subscriber documents
    Subscriber.find()
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  new: (req, res) => {
    res.render("subscribers/new");
  },
//create action to create the new subscriber
  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  //create the show action to to display subscriber data
  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show");
  },

  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber
        });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },
//create update action to set new values for an existing subscriber document
  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams
    })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },
//create the delete action
  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  }
};

