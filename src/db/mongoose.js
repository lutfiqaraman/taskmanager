const mongoose = require("mongoose");

const server = "127.0.0.1:27017";
const databaseName = "task-manager-api";

mongoose.connect(`mongodb://${server}/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
