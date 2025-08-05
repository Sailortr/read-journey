import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Kayıt
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authService.registerUser(formData);

      const user = {
        name: response.name,
        email: response.email,
      };

      return {
        user,
        token: response.token,
        refreshToken: response.refreshToken,
      };
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Giriş
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authService.loginUser(formData);

      const user = {
        name: response.name,
        email: response.email,
      };

      return {
        user,
        token: response.token,
        refreshToken: response.refreshToken,
      };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

// Çıkış
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await authService.logoutUser();
});
