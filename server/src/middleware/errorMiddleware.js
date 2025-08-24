// src/middleware/errorMiddleware.js

// 404 for unknown routes
function notFound(req, res, next) {
  res.status(404);
  res.json({ success: false, message: `Not Found - ${req.originalUrl}` });
}

// general error handler
function errorHandler(err, req, res, next) {
  console.error("❌", err); // Later: replace with proper logger
  const status =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res
    .status(status)
    .json({ success: false, message: err.message || "Server Error" });
}

module.exports = { notFound, errorHandler };
