const User = require("../models/user.model");

// Create a user
exports.create = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

// Fetch all users
exports.fetchAll = (req, res) => {
  User.find()
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

// Fetch User by ID
exports.fetchById = (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
			res.status(500).send(error);
    });
};
