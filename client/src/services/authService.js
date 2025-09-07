import API from "../api/axiosInstance";

export const registerUserAPI = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUserAPI = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const logoutUserAPI = async () => {
  await API.post("/auth/logout");
};

export const guestLoginAPI = async () => {
  const res = await axios.post(
    "/api/auth/guest-login",
    {},
    { withCredentials: true }
  );
  return res.data;
};
