const auth = require("../src/middleware/auth.middleware");

module.exports = app => {
  const Task = require("../controllers/task.controller");

  app.post("/tasks/task/create", auth, Task.create);
  app.get("/tasks", auth, Task.fetchAll);
  app.get("/tasks/:id", auth, Task.fetchTaskById);
  app.patch("/tasks/:id", auth, Task.updateTaskById);
  app.delete("/tasks/:id", auth, Task.deleteTaskById);
};
