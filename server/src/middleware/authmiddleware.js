const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to require a specific user role
const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = {
  requireAuth,
  requireRole,
};
