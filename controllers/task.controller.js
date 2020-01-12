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
exports.fetchTaskById = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a task
exports.updateTaskById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid property to be updated"});
  }
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);

    updates.forEach((update) => task[update] = req.body[update]);
    await task.save();
    

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Delete a task
exports.deleteTaskById = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      res.status(404).send("User is not exist");
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
