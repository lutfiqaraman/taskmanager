module.exports = (app) => {
    
    const Task = require("../controllers/task.controller");
    app.post("/tasks", Task.create);
}
