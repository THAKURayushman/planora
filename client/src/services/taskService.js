import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`; // backend base URL

// Helper to include JWT token in headers
const getAuthConfig = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all tasks
export const getTasks = async () => {
  const res = await axios.get(API_URL, getAuthConfig());
  return res.data;
};

// Create a new task
export const createTask = async (task) => {
  const res = await axios.post(API_URL, task, getAuthConfig());
  return res.data;
};

// Update a task
export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/${id}`, task, getAuthConfig());
  return res.data;
};

// Delete a task
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`, getAuthConfig());
};

// --- New: Mark task as studied ---
export const studyTask = async (id) => {
  const res = await axios.put(`${API_URL}/${id}/study`, {}, getAuthConfig());
  return res.data;
};
