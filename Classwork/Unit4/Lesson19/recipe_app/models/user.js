"use strict";
//creating a user model
const mongoose = require("mongoose"),
  { Schema } = mongoose,

  userSchema = new Schema( //create the user schema
    {
      name: { //adding first and last name properties
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }], //adding a courses property so connect users to courses
      subscribedAccount: { //add a subscribedAcount to connect users to subscribers
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      }
    },
    {
      timestamps: true //tracks created at time etc
    }
  );
//adding a virtual attribute to get the users full name. 
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});
//Listing 19.4 Adding a pre(‘save’) hook to user.js
userSchema.pre("save", function (next) { //set up the presave hook
  let user = this; //use the function keyword in the call back function
  if (user.subscribedAccount === undefined) { //add conditional check
    Subscriber.findOne({ //quary for a single subscriber
      email: user.email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber; //connect the user with a subscriber account
        next();
      })
      .catch(error => { 
        console.log(`Error in connecting subscriber:
 ${error.message}`);
        next(error); //pass errors to the next middleware function
      });
  } else {
    next(); //calls next if the user already has an association
  }
});

module.exports = mongoose.model("User", userSchema);