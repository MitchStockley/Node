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
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);