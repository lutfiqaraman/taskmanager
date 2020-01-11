module.exports = app => {
  const User = require("../controllers/user.controller");

  app.post("/users", User.create);
  app.get("/users", User.fetchAll);
  app.get("/users/:id", User.fetchUserById);
  app.patch("/users/:id", User.updateUserById);
  app.delete("/users/:id", User.deleteUserById);
};
