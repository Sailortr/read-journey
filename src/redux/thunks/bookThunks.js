import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookService from "../../services/bookService";

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommendedBooks",
  async (_, thunkAPI) => {
    try {
      const response = await bookService.getRecommendedBooks();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Önerilen kitaplar alınamadı"
      );
    }
  }
);

export const fetchLibraryBooks = createAsyncThunk(
  "books/fetchLibraryBooks",
  async (_, thunkAPI) => {
    try {
      const response = await bookService.getLibraryBooks();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Kitaplar alınamadı"
      );
    }
  }
);

export const addBookToLibraryThunk = createAsyncThunk(
  "books/addBookToLibrary",
  async (bookData, thunkAPI) => {
    try {
      const response = await bookService.addBookToLibrary(bookData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Kitap eklenemedi"
      );
    }
  }
);

export const addRecommendedBookToLibrary = createAsyncThunk(
  "books/addRecommendedBookToLibrary",
  async (bookId, thunkAPI) => {
    try {
      const response = await bookService.addRecommendedBookToLibrary(bookId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Tavsiye edilen kitap eklenemedi"
      );
    }
  }
);

export const removeBookFromLibrary = createAsyncThunk(
  "books/removeBookFromLibrary",
  async (bookId, thunkAPI) => {
    try {
      await bookService.removeBookFromLibrary(bookId);
      return bookId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Kitap silinemedi"
      );
    }
  }
);
