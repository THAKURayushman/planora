// src/utils/authUtils.js
export const saveAuthData = (user, accessToken) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", accessToken);
};

export const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const getAccessToken = () => localStorage.getItem("accessToken");
