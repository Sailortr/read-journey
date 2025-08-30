import api from "./api";

export const getRecommendedBooks = async (options = {}) => {
  const { page = 1, limit = 10, title = "", author = "" } = options;
  const params = { page, limit, title, author };
  const { data } = await api.get("/books/recommend", { params });
  return data;
};

export const getLibraryBooks = async (status) => {
  const params = status ? { status } : undefined;
  const { data } = await api.get("/books/own", { params });
  return data;
};

export const getBookById = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export const addBookToLibrary = async (bookData) => {
  const { data } = await api.post("/books/add", bookData);
  return data;
};

export const deleteBookFromLibrary = async (bookId) => {
  await api.delete(`/books/remove/${bookId}`);
  return true;
};
