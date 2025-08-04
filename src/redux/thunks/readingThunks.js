import { createAsyncThunk } from "@reduxjs/toolkit";
import readingService from "../../services/readingService";

// thunk - kitap okumaya başla
export const startReadingThunk = createAsyncThunk(
  "reading/start",
  async ({ bookId, page }) => {
    return await readingService.startReading({ bookId, page });
  }
);

// thunk - kitap okumayı bitir
export const stopReadingThunk = createAsyncThunk(
  "reading/stop",
  async ({ bookId, page }) => {
    return await readingService.stopReading({ bookId, page });
  }
);

// thunk - kitap istatistikleri
export const fetchReadingStats = createAsyncThunk(
  "reading/stats",
  async (bookId) => {
    return await readingService.getReadingStats(bookId);
  }
);

// thunk - okuma günlüğü
export const fetchReadingDiary = createAsyncThunk(
  "reading/diary",
  async (bookId) => {
    return await readingService.getReadingDiary(bookId);
  }
);

// thunk - günlüğü sil
export const deleteDiaryEntryThunk = createAsyncThunk(
  "reading/deleteEntry",
  async (entryId) => {
    await readingService.deleteDiaryEntry(entryId);
    return entryId;
  }
);
