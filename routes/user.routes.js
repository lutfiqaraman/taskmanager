const auth = require("../src/middleware/auth");

module.exports = app => {
  const User = require("../controllers/user.controller");

  app.get("/users/user/userprofile", auth, User.fetchUserProfile);
  
  app.post("/users/user/create", User.create);

  app.patch("/users/:id", User.updateUserById);
  
  app.delete("/users/user/delete", auth, User.deleteUserById);

  app.post("/users/login", User.userLogin);
  app.post("/users/logout", auth, User.userLogout);
  app.post("/users/logoutall", auth, User.userLogoutAll);
  
};
