const auth = require("../src/middleware/auth");

module.exports = app => {
  const Task = require("../controllers/task.controller");

  app.post("/tasks/task/create", auth, Task.create);
  app.get("/tasks", Task.fetchAll);
  app.get("/tasks/:id", Task.fetchTaskById);
  app.patch("/tasks/:id", Task.updateTaskById);
  app.delete("/tasks/:id", Task.deleteTaskById);
};
