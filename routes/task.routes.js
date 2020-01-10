module.exports = (app) => {
    
    const Task = require("../controllers/task.controller");
    app.post("/tasks", Task.create);
    app.get("/tasks", Task.fetchAll);
    app.get("/tasks/:id", Task.fetchById);
}
