import axios from "axios";

const API_URL = `${VITE_API_URL}`; // backend base URL

// Get all tasks
export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Create a new task
export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

// Update a task
export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/${id}`, task);
  return res.data;
};

// Delete a task
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// --- New: Mark task as studied ---
export const studyTask = async (id) => {
  const res = await axios.put(`${API_URL}/${id}/study`);
  return res.data;
};
