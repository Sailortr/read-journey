import { createSlice } from "@reduxjs/toolkit";
import {
  startReadingThunk,
  stopReadingThunk,
  fetchReadingStats,
  fetchReadingDiary,
  deleteDiaryEntryThunk,
} from "./thunks/readingThunks";

const initialState = {
  currentReading: null,
  diary: [],
  isLoading: false,
  error: null,
};

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    const pend = (s) => {
      s.isLoading = true;
      s.error = null;
    };
    const rej = (s, a) => {
      s.isLoading = false;
      s.error = a.payload || a.error?.message;
    };

    b.addCase(startReadingThunk.pending, pend);
    b.addCase(startReadingThunk.fulfilled, (s, a) => {
      s.isLoading = false;
      s.currentReading = a.payload;
      s.diary = a.payload?.progress || [];
    });
    b.addCase(startReadingThunk.rejected, rej);

    b.addCase(stopReadingThunk.pending, pend);
    b.addCase(stopReadingThunk.fulfilled, (s, a) => {
      s.isLoading = false;
      s.currentReading = a.payload;
      s.diary = a.payload?.progress || [];
    });
    b.addCase(stopReadingThunk.rejected, rej);

    b.addCase(fetchReadingStats.pending, pend);
    b.addCase(fetchReadingStats.fulfilled, (s, a) => {
      s.isLoading = false;
      s.currentReading = a.payload;
      s.diary = a.payload?.progress || [];
    });
    b.addCase(fetchReadingStats.rejected, rej);

    b.addCase(fetchReadingDiary.fulfilled, (s, a) => {
      s.diary = a.payload || [];
    });

    b.addCase(deleteDiaryEntryThunk.fulfilled, (s, a) => {
      s.currentReading = a.payload;
      s.diary = a.payload?.progress || [];
    });
  },
});

export default readingSlice.reducer;
