const User = require("../models/user.model");

// Create a new user
exports.create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch(error) {
    res.status(400).send(error);
  }

};

// Fetch all users
exports.fetchAll = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fetch User by ID
exports.fetchById = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
