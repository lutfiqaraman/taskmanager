const Task = require("../models/task.model");

exports.create = (req, res) => {
    const task = new Task(req.body);
  
    task
      .save()
      .then(() => {
          res.status(201).send(task);
      })
      .catch((error) => {
          res.status(400).send(error);
      });
  };