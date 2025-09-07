// src/features/tasks/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/task";

// ================= Async Thunks ================= //

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.fetchTasks();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const { data } = await api.createTask(taskData);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateTask(id, updates);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteTask(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ================= Slice ================= //

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---------------- getTasks ----------------
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- addTask ----------------
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- editTask ----------------
      .addCase(editTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- removeTask ----------------
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((t) => t._id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
