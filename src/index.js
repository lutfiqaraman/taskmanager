const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  process.stdout.write("Server is up on " + port);
  process.stdout.write("\n");
});