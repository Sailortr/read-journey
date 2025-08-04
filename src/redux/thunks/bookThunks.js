import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookService from "../../services/bookService"; // 💡 Tüm fonksiyonları import ettik

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommended",
  async () => {
    return await bookService.getRecommendedBooks();
  }
);

export const fetchLibraryBooks = createAsyncThunk(
  "books/fetchLibrary",
  async () => {
    return await bookService.getLibraryBooks();
  }
);

export const addBookToLibrary = createAsyncThunk(
  "books/addToLibrary",
  async (bookData) => {
    return await bookService.addBookToLibrary(bookData);
  }
);
