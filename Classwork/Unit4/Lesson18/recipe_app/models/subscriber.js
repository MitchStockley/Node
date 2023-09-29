"use strict";

const mongoose = require("mongoose"),
  //adding validators to the subscriber schema 
  subscriberSchema = mongoose.Schema({
    name: { //requiring the name property
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999
    },
    //Add a courses property to subscribers that stores a reference to each associated course
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  });



//Adding instance methods to the schema in subscriber.js
//add an instance method to get the full name of the subscriber
subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Zip Code:
     ${this.zipCode}`;
};

//add an instance method to find subscribers with the same zip code. 
subscriberSchema.methods.findLocalSubscribers = function () {
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec(); //access the subscriber model to use the find method. 
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
