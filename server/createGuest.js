require("dotenv").config();
console.log("Mongo URI:", process.env.MONGODB_URI);
const mongoose = require("mongoose");
const User = require("./src/models/User"); // correct path
const bcrypt = require("bcryptjs");

async function createGuest() {
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await User.findOne({ email: "guest@planora.com" });
  if (!existing) {
    const hashed = await bcrypt.hash("guest123", 10);
    await User.create({
      name: "Guest User",
      email: "guest@planora.com",
      password: hashed,
      role: "guest",
    });
    console.log("Guest user created!");
    console.log(User);
  } else {
    console.log("Guest user already exists");
  }
  process.exit();
}

createGuest();
