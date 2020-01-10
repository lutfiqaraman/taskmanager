const mongoose = require("mongoose");

const server = "127.0.0.1:27017";
const database = "task-manager-api";

mongoose.connect(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
