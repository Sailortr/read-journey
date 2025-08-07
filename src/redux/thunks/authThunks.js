import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

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

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await authService.loginUser(formData);
      const { name, email, token } = data;

      localStorage.setItem("user", JSON.stringify({ name, email }));
      localStorage.setItem("accessToken", token);

      return { name, email, token };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  await authService.logoutUser?.();
});

export const restoreUserFromLocalStorage = createAsyncThunk(
  "auth/restoreUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("accessToken");

      if (!user || !token) {
        throw new Error("No session found");
      }

      return { ...user, token };
    } catch (err) {
      return rejectWithValue("Oturum geri yüklenemedi");
    }
  }
);
