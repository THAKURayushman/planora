import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/tasks";

// Async thunks

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const { data } = await api.fetchTasks();
  return data.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const { data } = await api.createTask(taskData);
  return data.data;
});

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updates }) => {
    const { data } = await api.updateTask(id, updates);
    return data.data;
  }
);

export const removeTask = createAsyncThunk("tasks/removeTask", async (id) => {
  await api.deleteTask(id);
  return id;
});

// Slice

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getTasks
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addTask
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // editTask
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      // removeTask
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
