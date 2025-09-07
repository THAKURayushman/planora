//src/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["user", "admin", "guest"], default: "user" },

    // Single active refresh token (simpler). For multi-device, store array.
    refreshTokenHash: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.setRefreshToken = async function (token) {
  const salt = await bcrypt.genSalt(10);
  this.refreshTokenHash = await bcrypt.hash(token, salt);
};

userSchema.methods.verifyRefreshToken = function (token) {
  if (!this.refreshTokenHash) return false;
  return bcrypt.compare(token, this.refreshTokenHash);
};

module.exports = mongoose.model("User", userSchema);
