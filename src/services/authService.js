import api from "./api";

const authService = {
  loginUser: async (formData) => {
    const { data } = await api.post("/users/signin", formData);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.name,
        email: data.email,
        id: data.id,
      })
    );
    return data;
  },

  registerUser: async (formData) => {
    const { data } = await api.post("/users/signup", formData);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.name,
        email: data.email,
        id: data.id,
      })
    );
    return data;
  },

  logoutUser: async () => {
    await api.post("/users/signout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default authService;
