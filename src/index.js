const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  process.stdout.write("Server is up on " + port);
  process.stdout.write("\n");
});

// const express = require("express");
// require("./db/mongoose");
// require("dotenv").config({ path: "./config/.env" });

// const app = express();
// const port = process.env.PORT;

// app.use(express.json());

// require("../routes/task.routes")(app);
// require("../routes/user.routes")(app);

// app.listen(port, () => {
//   process.stdout.write("Server is up on " + port);
//   process.stdout.write("\n");
// });