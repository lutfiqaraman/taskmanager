const Task = require("../models/task.model");

// Create a new task
exports.create = async (req, res) => {
  const userId = req.user._id;

  const task = new Task({
    ...req.body,
    owner: userId
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get All tasks /tasks?completed=true
// Get All tasks /tasks?limit=10&skip=10 - show 10 tasks, skip 20 tasks
// Get All tasks /tasks?sortBy=createdAt:desc
exports.fetchAll = async (req, res) => {
  const taskStatus = {};
  const sort = {};

  if (req.query.completed) {
    taskStatus.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "usertasks",
        match: taskStatus,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.usertasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fetch Task by ID
exports.fetchTaskById = async (req, res) => {
  const _id = req.params.id;

  try {
    const ownerID = req.user._id;
    const task = await Task.findOne({ _id, owner: ownerID });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a task
exports.updateTaskById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid property to be updated" });
  }
  try {
    const _id = req.params.id;
    const ownerID = req.user._id;
    const task = await Task.findOne({ _id, owner: ownerID });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Delete a task
exports.deleteTaskById = async (req, res) => {
  try {
    const _id = req.params.id;
    const ownerID = req.user._id;
    const task = await Task.findOneAndDelete({ _id, owner: ownerID });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
