import { createAsyncThunk } from "@reduxjs/toolkit";
import readingService from "../../services/readingService";

export const startReadingThunk = createAsyncThunk(
  "reading/start",
  async ({ bookId, page }) => {
    return await readingService.startReading({ bookId, page });
  }
);

export const stopReadingThunk = createAsyncThunk(
  "reading/stop",
  async ({ bookId, page }) => {
    return await readingService.stopReading({ bookId, page });
  }
);

export const fetchReadingStats = createAsyncThunk(
  "reading/stats",
  async (bookId) => {
    return await readingService.getReadingStats(bookId);
  }
);

export const fetchReadingDiary = createAsyncThunk(
  "reading/diary",
  async (bookId) => {
    return await readingService.getReadingDiary(bookId);
  }
);

export const deleteDiaryEntryThunk = createAsyncThunk(
  "reading/deleteEntry",
  async (entryId) => {
    await readingService.deleteDiaryEntry(entryId);
    return entryId;
  }
);
