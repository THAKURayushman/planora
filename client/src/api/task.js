import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// CRUD requests
export const fetchTasks = () => API.get("/tasks");
export const fetchTask = (id) => API.get(`/tasks/${id}`);
export const createTask = (taskData) => API.post("/tasks", taskData);
export const updateTask = (id, updates) => API.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
