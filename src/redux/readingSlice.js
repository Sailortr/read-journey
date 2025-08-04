import { createSlice } from "@reduxjs/toolkit";
import {
  startReadingThunk,
  stopReadingThunk,
  fetchReadingStats,
} from "./thunks/readingThunks";

const initialState = {
  currentReading: null,
  stats: [],
  isLoading: false,
};

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startReadingThunk.fulfilled, (state, action) => {
        state.currentReading = action.payload;
      })
      .addCase(stopReadingThunk.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.currentReading = null;
      })
      .addCase(fetchReadingStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default readingSlice.reducer;
