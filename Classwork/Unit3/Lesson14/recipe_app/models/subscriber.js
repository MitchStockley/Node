"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({ //create new schema
    name: String,
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema); //Export the subscriber model as the only mudule export
