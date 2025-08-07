import api from "./api";

const readingService = {
  startReading: async ({ bookId, page }) => {
    const { data } = await api.post(`/reading/start`, { bookId, page });
    return data;
  },

  stopReading: async ({ bookId, page }) => {
    const { data } = await api.post(`/reading/finish`, { bookId, page });
    return data;
  },

  getReadingDiary: async (bookId) => {
    const { data } = await api.get(`/reading/${bookId}/diary`);
    return data;
  },

  getReadingStats: async (bookId) => {
    const { data } = await api.get(`/reading/${bookId}/statistics`);
    return data;
  },

  deleteDiaryEntry: async (entryId) => {
    await api.delete(`/reading/diary/${entryId}`);
  },
};

export default readingService;
