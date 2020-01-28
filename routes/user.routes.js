const auth = require("../src/middleware/auth");
const multer = require("multer");

module.exports = app => {
  const User = require("../controllers/user.controller");

  app.get("/users/user/showprofile", auth, User.fetchUserProfile);
  
  app.post("/users/user/create", User.create);

  app.patch("/users/user/update", auth, User.updateUser);
  
  app.delete("/users/user/delete", auth, User.deleteUser);

  app.post("/users/login", User.userLogin);
  app.post("/users/logout", auth, User.userLogout);
  app.post("/users/logoutall", auth, User.userLogoutAll);

  app.post("users/user/avatar", User.userProfileUpload);
  
};
