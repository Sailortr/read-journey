import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecommendedBooks,
  addBookToLibrary,
  fetchLibraryBooks,
} from "./thunks/bookThunks";

const initialState = {
  recommendedBooks: [],
  books: [],
  isLoading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.recommendedBooks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLibraryBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(addBookToLibrary.fulfilled, (state, action) => {
        state.books.push(action.payload);
      });
  },
});

export default bookSlice.reducer;
