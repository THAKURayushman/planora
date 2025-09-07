import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUserAPI,
  loginUserAPI,
  logoutUserAPI,
  guestLoginAPI,
} from "../../services/authService.js";

// Helpers
const saveAuthData = (user, accessToken) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", accessToken);
};

const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

// ================= Async Thunks ================= //
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserAPI(userData);
      saveAuthData(data.user, data.accessToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await loginUserAPI(userData);
      saveAuthData(data.user, data.accessToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserAPI();
      clearAuthData();
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const guestLogin = createAsyncThunk(
  "auth/guestLogin",
  async (_, { rejectWithValue }) => {
    try {
      const data = await guestLoginAPI();
      saveAuthData(data.user, data.accessToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ================= Slice ================= //
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
        clearAuthData(); // ensure no stale token
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        state.error = null;
        clearAuthData();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //guest-login
      .addCase(guestLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(guestLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(guestLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;
