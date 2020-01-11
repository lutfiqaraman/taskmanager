const mongoose = require("mongoose");
const validator = require("validator").default;

const User = mongoose.model("User", {
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is wrong");
            }
        }
    },
    password: {
          type: String,
          required: true,
          trim: true,
          validate(value) {
              if (value.toLowerCase().includes("password")) {
                  throw new Error("Password cannot contain password");
              }
          }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be over 0");
            }
        }
    }
  });

  module.exports = User;
  