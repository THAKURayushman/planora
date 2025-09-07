//src/models/Task.js

const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, default: "" },
    duration: { type: Number, required: true, min: 5 },
    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 5, // middle value
    },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Task", TaskSchema);
