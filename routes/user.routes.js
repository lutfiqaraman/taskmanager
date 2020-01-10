module.exports = (app) => {

    const User = require("../controllers/user.controller");
    
    app.post("/users", User.create);
    app.get("/users", User.fetchAll);
    app.get("/users/:id", User.fetchById);
    
}