import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookService from "../../services/bookService";
import api from "../../services/api";

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

export const addRecommendedBookToLibrary = createAsyncThunk(
  "books/addRecommendedBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/books/add/${bookId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeBookFromLibrary = createAsyncThunk(
  "books/removeBook",
  async (bookId, { rejectWithValue }) => {
    try {
      await api.delete(`/books/remove/${bookId}`);
      return bookId; // Store'dan silmek için ID döndürüyoruz
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
