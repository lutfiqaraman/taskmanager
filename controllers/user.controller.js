const User = require("../models/user.model");

// Create a new user
exports.create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
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
exports.fetchUserById = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a user
exports.updateUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Delete a user
exports.deleteUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      res.status(404).send("User is not exist");
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
