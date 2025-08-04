// services/bookService.js
import api from "./api";

const bookService = {
  getRecommendedBooks: async (options = {}) => {
    const { page = 1, limit = 10, title = "", author = "" } = options;

    const params = { page, limit, title, author };
    const { data } = await api.get("/books/recommend", { params });
    return data;
  },

  getLibraryBooks: async () => {
    const { data } = await api.get("/books/user");
    return data;
  },

  addBookToLibrary: async (bookData) => {
    const { data } = await api.post("/books", bookData);
    return data;
  },

  deleteBookFromLibrary: async (bookId) => {
    await api.delete(`/books/${bookId}`);
  },

  getBookDetail: async (id) => {
    const { data } = await api.get(`/books/${id}`); // ✅ burada `response.data` hatalıydı
    return data;
  },
};

export default bookService;
