// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/auth.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

// 🔒 Security headers
app.use(helmet());

// 🌐 CORS
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// 📦 JSON body parser & cookies
app.use(express.json());
app.use(cookieParser());

// 📝 Logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// 🚦 Rate limit for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/auth", authLimiter);

// ✅ Health check (for Render/Railway)
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// 🛣 Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 🧱 Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
