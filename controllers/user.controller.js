const User = require("../models/user.model");

// Fetch all users
exports.fetchUserProfile = async (req, res) => {
  res.send(req.user);
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

// Create a new user
exports.create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a user
exports.updateUserById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid property to be updated"});
  }

  try {
    const _id = req.params.id;
    const user = await User.findById(_id);

    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();

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

// User Login
exports.userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const plainPassword = req.body.password;

    const user = await User.findByCredentials(email, plainPassword);
    const token = await user.generateAuthToken();

    res.send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }
};

// User Logout
exports.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
}

// User Logout all other sessions
exports.userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
}
