import api from "./api";

const getRecommendedBooks = async (options = {}) => {
  const { page = 1, limit = 10, title = "", author = "" } = options;
  const params = { page, limit, title, author };
  const { data } = await api.get("/books/recommend", { params });
  return data;
};

const getLibraryBooks = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token bulunamadı!");

  const { data } = await api.get("/books/user");
  return data;
};

const addBookToLibrary = async (bookData) => {
  const { data } = await api.post("/books/add", bookData);
  return data;
};

const deleteBookFromLibrary = async (bookId) => {
  await api.delete(`/books/remove/${bookId}`);
};

const getBookDetail = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export {
  getRecommendedBooks,
  getLibraryBooks,
  addBookToLibrary,
  deleteBookFromLibrary,
  getBookDetail,
};

export const addRecommendedBookToLibrary = (id) => api.post(`/books/add/${id}`);

export const removeBookFromLibrary = (id) => api.delete(`/books/${id}`);
