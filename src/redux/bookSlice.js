import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./thunks/authThunks";
import {
  fetchRecommendedBooks,
  addBookToLibraryThunk,
  fetchLibraryBooks,
  removeBookFromLibrary,
  addRecommendedBookToLibrary,
} from "./thunks/bookThunks";

const norm = (s) => (s || "").trim().toLowerCase();
const sameBook = (a, b) => {
  const idA = a._id || a.id || a.bookId || a.slug;
  const idB = b._id || b.id || b.bookId || b.slug;
  if (idA && idB && String(idA) === String(idB)) return true;

  return norm(a.title) === norm(b.title) && norm(a.author) === norm(b.author);
};

const dedupePush = (arr, book) => {
  if (!book) return;
  const exists = arr.some((it) => sameBook(it, book));
  if (!exists) arr.push(book);
};

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
        state.recommendedBooks = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.isLoading = false;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchLibraryBooks.fulfilled, (state, action) => {
        state.books = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(addBookToLibraryThunk.fulfilled, (state, action) => {
        dedupePush(state.books, action.payload);
      })

      .addCase(addRecommendedBookToLibrary.fulfilled, (state, action) => {
        if (!state.books) state.books = [];
        const added = action.payload;
        if (!added) return;
        const id = added._id || added.id;
        const has = state.books.some((b) => (b._id || b.id) === id);
        if (!has) state.books.push(added);
      })

      .addCase(removeBookFromLibrary.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => (book._id || book.id || book.bookId) !== action.payload
        );
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.books = [];
        state.recommendedBooks = [];
        state.error = null;
      });
  },
});

export default bookSlice.reducer;
