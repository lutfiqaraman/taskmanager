const multer = require("multer");

const upload = multer({ 
    
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

module.exports = upload;