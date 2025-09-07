// src/routes/authRoutes.js
const express = require("express");
const {
  register,
  login,
  refresh,
  me,
  logout,
  guestLogin,
} = require("../controllers/authcontroller");
const { requireAuth } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", requireAuth, me);
router.post("/logout", logout);
router.post("/guest-login", guestLogin);

module.exports = router;
