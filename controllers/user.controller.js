const User = require("../models/user.model");
const sharp = require("sharp");

// Fetch all users
exports.fetchUserProfile = async (req, res) => {
  res.send(req.user);
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
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid property to be updated" });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
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

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// User Logout
exports.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// User Logout all other sessions
exports.userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Upload user profile image
exports.uploadUserProfileImage = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 160, height: 160 })
    .png()
    .toBuffer();

  req.user.avatar = buffer;
  await req.user.save();
  
  res.send();
};

// Delete user profile image
exports.deleteUserProfileImage = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

// Get user profile
exports.getUserProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, (err, doc) => {
      if (err || !doc || !doc.avatar) {
        res.status(400).send("User is not found !");
      }
    });

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
};
