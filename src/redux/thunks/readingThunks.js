import { createAsyncThunk } from "@reduxjs/toolkit";
import readingService from "../../services/readingService";

export const startReadingThunk = createAsyncThunk(
  "reading/start",
  async ({ bookId, page }, { rejectWithValue }) => {
    try {
      return await readingService.startReading({ bookId, page });
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);

export const stopReadingThunk = createAsyncThunk(
  "reading/stop",
  async ({ bookId, page }, { rejectWithValue }) => {
    try {
      return await readingService.stopReading({ bookId, page });
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);

export const fetchReadingStats = createAsyncThunk(
  "reading/bookDetail",
  async (bookId, { rejectWithValue }) => {
    try {
      return await readingService.getBook(bookId);
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);

export const fetchReadingDiary = createAsyncThunk(
  "reading/diary",
  async (bookId, { rejectWithValue }) => {
    try {
      const book = await readingService.getBook(bookId);
      return book.progress || [];
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);

export const deleteDiaryEntryThunk = createAsyncThunk(
  "reading/deleteEntry",
  async ({ bookId, readingId }, { rejectWithValue }) => {
    try {
      return await readingService.deleteReading({ bookId, readingId });
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);
