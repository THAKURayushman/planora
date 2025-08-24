const { z } = require("zod");
const User = require("../models/User");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefresh,
} = require("../utils/tokenutil");

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const setRefreshCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/api/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const user = await User.create({ name, email, password });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await user.setRefreshToken(refreshToken);
    await user.save();

    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: err.errors[0]?.message });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email }).select(
      "+password +refreshTokenHash"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await user.setRefreshToken(refreshToken);
    await user.save();

    setRefreshCookie(res, refreshToken);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: err.errors[0]?.message });
    }
    next(err);
  }
};

const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const payload = verifyRefresh(token);
    const user = await User.findById(payload.sub).select("+refreshTokenHash");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const ok = await user.verifyRefreshToken(token);
    if (!ok) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newRefreshToken = createRefreshToken(user);
    await user.setRefreshToken(newRefreshToken);
    await user.save();

    setRefreshCookie(res, newRefreshToken);

    const accessToken = createAccessToken(user);
    res.json({ accessToken });
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

const me = async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "_id name email role createdAt"
  );
  res.json({ user });
};

const logout = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (token) {
    try {
      const payload = verifyRefresh(token);
      const user = await User.findById(payload.sub).select("+refreshTokenHash");
      if (user) {
        user.refreshTokenHash = undefined;
        await user.save();
      }
    } catch {
      // Ignore token errors on logout
    }
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/auth/refresh",
  });

  res.json({ message: "Logged out" });
};

module.exports = {
  register,
  login,
  refresh,
  me,
  logout,
};
