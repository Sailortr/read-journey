import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Kayıt
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      return await authService.registerUser(formData);
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
      return await authService.loginUser(formData);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

// Çıkış
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await authService.logoutUser();
});
