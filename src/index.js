const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

require("../routes/task.routes")(app);
require("../routes/user.routes")(app);

app.listen(port, () => {
  process.stdout.write("Server is up on " + port);
  process.stdout.write("\n");
});
