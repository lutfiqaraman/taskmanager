const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const User = mongoose.model("User", {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

const myInfo = new User({
  name: "Lutfi",
  age: 35
});

myInfo
  .save()
  .then(myInfo => {
    console.log(myInfo);
  })
  .catch(error => {
    if (error) throw error;
  });
