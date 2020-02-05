const auth = require("../src/middleware/auth");
var multer = require("multer");
var upload = multer({ 
  dest: "avatars",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callBack) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callBack(new Error("Only jpg, jpeg, png formats are allowed"));
    }

    callBack(undefined, true);
  }
});

module.exports = app => {
  const User = require("../controllers/user.controller");

  app.get("/users/user/showprofile", auth, User.fetchUserProfile);
  
  app.post("/users/user/create", User.create);

  app.patch("/users/user/update", auth, User.updateUser);
  
  app.delete("/users/user/delete", auth, User.deleteUser);

  app.post("/users/login", User.userLogin);
  app.post("/users/logout", auth, User.userLogout);
  app.post("/users/logoutall", auth, User.userLogoutAll);

  app.post("/users/user/avatar", upload.single("avatar"), User.userProfileUpload);
  
};
