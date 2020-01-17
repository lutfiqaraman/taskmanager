const auth = require("../src/middleware/auth");

module.exports = app => {
  const User = require("../controllers/user.controller");

  app.get("/users/userprofile", auth, User.fetchUserProfile);
  app.get("/users/:id", User.fetchUserById);
  
  app.post("/users", User.create);

  app.patch("/users/:id", User.updateUserById);
  
  app.delete("/users/:id", User.deleteUserById);

  app.post("/users/login", User.userLogin);
  app.post("/users/logout", auth, User.userLogout);
  app.post("/users/logoutall", auth, User.userLogoutAll);
  
};
