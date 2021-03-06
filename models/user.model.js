const mongoose = require("mongoose");
const validator = require("validator").default;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task.model");

require("dotenv").config({ path: "./config/.env" });

// Schema of User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
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
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

// Virtual Property
userSchema.virtual("usertasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

// Hide Private Data
userSchema.methods.toJSON = function() {
  const user = this;
  const userInfo = user.toObject();

  delete userInfo.password;
  delete userInfo.tokens;
  delete userInfo.avatar;

  return userInfo;
};

// Generate Authentication Token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_PRIVATEKEY
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Authenticate the user
userSchema.statics.findByCredentials = async (email, plainpassword) => {
  const user = await User.findOne({ email });
  const hashPassword = user.password;

  if (user == null) {
    throw new Error("Unable to login");
  }

  const isValidPassword = bcrypt.compareSync(plainpassword, hashPassword);

  if (!isValidPassword) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hashing a plain password before saving
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    const password = user.password;

    user.password = bcrypt.hashSync(password, salt);
  }

  next();
});

// Delete tasks when user is deleted
userSchema.pre("remove", async function(next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
