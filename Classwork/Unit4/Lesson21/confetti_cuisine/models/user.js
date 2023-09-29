//Listing 21.3 Creating the User model in user.js

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    Subscriber = require("./subscriber"),
    userSchema = new Schema(
        {
            name: {
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
                unique: true
            },
            zipCode: {
                type: Number,
                min: [10000, "Zip code too short"],
                max: 99999
            }, //require password
            password: {
                type: String,
                required: true
            },
            courses: [
                {
                    type: Schema.Types.ObjectId, //associate users with multiple courses
                    ref: "Course"
                }
            ],
            subscribedAccount: {
                type: Schema.Types.ObjectId,
                ref: "Subscriber" //associate users with subscribers
            }
        },
        {
            timestamps: true
        }
    );
    //Listing 21.4 Adding a virtual attribute and pre("save") hook in user.js
userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});
userSchema.pre("save", function (next) { //add pre save hook to link a subscriber
    let user = this;
    if (user.subscribedAccount === undefined) { //checked for a linked subscribed account
        Subscriber.findOne({
            email: user.email //search the subscriber model for documents that contain that users email.
        })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next(); //call next middleware functions
            })
            .catch(error => {
                console.log(`Error in connecting subscriber:
         ${error.message}`);
                next(error);
            });
    } else {
        next();
    }
});
module.exports = mongoose.model("User", userSchema);