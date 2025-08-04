// src/services/authService.js

import api from "./api";

const authService = {
  registerUser: async (formData) => {
    const { data } = await api.post("/users/signup", formData);
    localStorage.setItem("token", data.token);
    return data;
  },

  loginUser: async (formData) => {
    const { data } = await api.post("/users/signin", formData);
    localStorage.setItem("token", data.token);
    return data;
  },

  logoutUser: async () => {
    await api.post("/users/signout");
    localStorage.removeItem("token");
  },
};

export default authService;
