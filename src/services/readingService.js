import api from "./api";

const startReading = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/start", { id, page });
  return data;
};

const finishReading = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/finish", { id, page });
  return data;
};

const getBookDetails = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

const deleteReading = async ({ bookId, readingId }) => {
  const { data } = await api.delete(`/books/reading`, {
    params: { bookId, readingId },
  });
  return data;
};

export default { startReading, finishReading, getBookDetails, deleteReading };
