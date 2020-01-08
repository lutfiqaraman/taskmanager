const mongoose = require("mongoose");
const validator = require("validator").default;

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const Task = mongoose.model("Task", {
  description: {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isLength(value, {min: 3, max: undefined})) {
				throw new Error("Must be more than 3 characters");
			}
		}
  },
  completed: {
		type: Boolean,
		default: () => {
			return false;
		}
  }
});

const task = new Task({
	description: "Learn how to do CRUD in Mongoose"
});

task
	.save()
  .then(taksinfo => {
    console.log(taksinfo);
  })
  .catch(error => {
    if (error) throw error;
  });
