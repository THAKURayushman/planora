// src/controllers/taskController.js

const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all tasks (only for logged-in user)
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json({ success: true, count: tasks.length, data: tasks });
});

// @desc    Get single task (only if owned by user)
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: task });
});

// @desc    Create task (auto-assign to logged-in user)
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res) => {
  const { title, subject, duration, priority, deadline } = req.body;

  if (!title || !duration) {
    return res.status(400).json({
      success: false,
      message: "Title and duration are required",
    });
  }

  const task = await Task.create({
    title,
    subject,
    duration,
    priority,
    deadline,
    userId: req.user.id, // 👈 add userId from authMiddleware
  });

  res.status(201).json({ success: true, data: task });
});

// @desc    Update task (only if owned by user)
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
  const updates = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id }, // 👈 filter by user
    updates,
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: task });
});

// @desc    Delete task (only if owned by user)
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id, // 👈 filter by user
  });

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, message: "Task deleted" });
});
