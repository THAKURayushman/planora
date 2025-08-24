const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc Get all tasks
// @route GET /api/tasks
// @access Public (add auth later)
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json({ success: true, count: tasks.length, data: tasks });
});

// @desc Get single task
// @route GET /api/tasks/:id
exports.getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
});

// @desc Create task
// @route POST /api/tasks
exports.createTask = asyncHandler(async (req, res) => {
  const { title, subject, durationMinutes, priority, deadline } = req.body;
  if (!title || !durationMinutes) {
    return res.status(400).json({
      success: false,
      message: "title and durationMinutes are required",
    });
  }
  const task = await Task.create({
    title,
    subject,
    durationMinutes,
    priority,
    deadline,
  });
  res.status(201).json({ success: true, data: task });
});

// @desc Update task
// @route PUT /api/tasks/:id
exports.updateTask = asyncHandler(async (req, res) => {
  const updates = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
});

// @desc Delete task
// @route DELETE /api/tasks/:id
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, message: "Task deleted" });
});
