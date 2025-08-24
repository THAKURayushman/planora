const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, default: "" },
    durationMinutes: { type: Number, required: true, min: 5 },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
  },
  { timestamps: true }
);

module.exports = model("Task", TaskSchema);
