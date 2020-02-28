const express = require("express");

require("./db/mongoose");
require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(express.json());

require("../routes/task.routes")(app);
require("../routes/user.routes")(app);

module.exports = app;