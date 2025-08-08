import api from "./api";

const authService = {
  loginUser: async (formData) => {
    const { data } = await api.post("/users/signin", formData);

    const { token, user } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return data;
  },

  registerUser: async (formData) => {
    const { data } = await api.post("/users/signup", formData);

    const { token, user } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return data;
  },

  logoutUser: async () => {
    try {
      await api.post("/users/signout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
};

export default authService;
