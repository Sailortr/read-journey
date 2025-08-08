import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./thunks/authThunks";
import {
  fetchRecommendedBooks,
  addBookToLibraryThunk,
  fetchLibraryBooks,
  removeBookFromLibrary,
  addRecommendedBookToLibrary,
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

      .addCase(addBookToLibraryThunk.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })

      .addCase(removeBookFromLibrary.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => (book._id || book.id) !== action.payload
        );
      })

      .addCase(addRecommendedBookToLibrary.fulfilled, (state, action) => {
        if (!state.books) {
          state.books = [];
        }

        if (action.payload) {
          state.books.push(action.payload);
        }
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.books = [];
        state.recommendedBooks = [];
        state.error = null;
      });
  },
});

export default bookSlice.reducer;
