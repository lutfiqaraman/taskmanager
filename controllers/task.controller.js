const Task = require("../models/task.model");

// Create a new task
exports.create = async (req, res) => {
    const task = new Task(req.body);

    try {
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  };

// Fetch all tasks
exports.fetchAll = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }  
};
    
// Fetch Task by ID  
exports.fetchById = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }  
};
  