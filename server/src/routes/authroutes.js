const express = require("express");
const {
  register,
  login,
  refresh,
  me,
  logout,
} = require("../controllers/authcontroller");
const { requireAuth } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

module.exports = router;
