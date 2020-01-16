const auth = require("../src/middleware/auth");

module.exports = app => {
  const User = require("../controllers/user.controller");

  app.post("/users", User.create);
  app.post("/users/login", User.userLogin);
  
  app.get("/users", auth, User.fetchAll);
  app.get("/users/:id", User.fetchUserById);
  
  app.patch("/users/:id", User.updateUserById);
  
  app.delete("/users/:id", User.deleteUserById);

};
