module.exports = (app) => {

    const User = require("../controllers/user.controller");
    app.post("/users", User.create);
    
}