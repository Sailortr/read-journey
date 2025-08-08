import api from "./api";

const getRecommendedBooks = async (options = {}) => {
  const { page = 1, limit = 10, title = "", author = "" } = options;
  const params = { page, limit, title, author };
  const { data } = await api.get("/books/recommend", { params });
  return data;
};

const getLibraryBooks = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Token bulunamadı!");

  const { data } = await api.get("/books/own");
  return data;
};

const addBookToLibrary = async (bookData) => {
  const { data } = await api.post("/books/add", bookData);
  return data;
};

const deleteBookFromLibrary = async (bookId) => {
  await api.delete(`/books/remove/${bookId}`);
  console.log("Kitap eklendi mi?", data);
};

const getBookDetail = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

const removeBookFromLibrary = async (bookId) => {
  await api.delete(`/books/remove/${bookId}`);
};

export {
  getRecommendedBooks,
  getLibraryBooks,
  addBookToLibrary,
  deleteBookFromLibrary,
  removeBookFromLibrary,
  getBookDetail,
};
