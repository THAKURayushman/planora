const jwt = require("jsonwebtoken");

// Helper to sign tokens
const sign = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });

// Create access token
const createAccessToken = (user) => {
  return sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_ACCESS_SECRET,
    process.env.ACCESS_TOKEN_TTL || "15m"
  );
};

// Create refresh token
const createRefreshToken = (user) => {
  return sign(
    { sub: user._id.toString() },
    process.env.JWT_REFRESH_SECRET,
    process.env.REFRESH_TOKEN_TTL || "7d"
  );
};

// Verify access token
const verifyAccess = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET);

// Verify refresh token
const verifyRefresh = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

// Export all
module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccess,
  verifyRefresh,
};
