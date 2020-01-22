const mongoose = require("mongoose");
const validator = require("validator").default;

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isLength(value, { min: 3, max: undefined })) {
        throw new Error("Must be more than 3 characters");
      }
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
