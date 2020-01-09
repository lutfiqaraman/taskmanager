const User = require("../models/user.model");

exports.create = (req, res) => {
    const user = new User(req.body);
  
    user
      .save()
      .then(() => {
          res.status(201).send(user);
      })
      .catch((error) => {
          res.status(400).send(error);
      });
  };