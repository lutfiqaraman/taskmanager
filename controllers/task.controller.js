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

// Fetch all tasks
exports.fetchAll = (req, res) => {
    Task.find()
      .then(task => {
        res.send(task);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  };
  
  // Fetch Task by ID
  exports.fetchById = (req, res) => {
    const _id = req.params.id;
  
    Task.findById(_id)
      .then(task => {
        res.send(task);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  };
  