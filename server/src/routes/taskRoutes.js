// src/routes/taskRoutes.js
const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { requireAuth } = require("../middleware/authmiddleware");

const router = express.Router();

// Routes for tasks (protected)
router.route("/").get(requireAuth, getTasks).post(requireAuth, createTask);

router
  .route("/:id")
  .get(requireAuth, getTask)
  .put(requireAuth, updateTask)
  .delete(requireAuth, deleteTask);

module.exports = router;
