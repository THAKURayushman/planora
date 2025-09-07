// src/components/GuestLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const GuestLogin = ({ apiUrl }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/guest-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Guest login failed");

      // Store user and access token in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ Update Redux state
      dispatch(loginUser.fulfilled(data));

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Guest login failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGuestLogin}
      disabled={loading}
      className="bg-gray-700 text-gray-200 px-6 py-2 rounded-lg font-semibold text-sm sm:text-base
                 transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 hover:text-gray-900"
    >
      {loading ? "Logging in..." : "Continue as Guest"}
    </button>
  );
};

export default GuestLogin;
