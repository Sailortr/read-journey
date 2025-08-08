import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookService from "../../services/bookService";
import api from "../../services/api";

export const fetchLibraryBooks = createAsyncThunk(
  "books/fetchLibraryBooks",
  async (_, thunkAPI) => {
    try {
      const response = await bookService.getLibraryBooks();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Kitaplar alınamadı"
      );
    }
  }
);

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

export const addRecommendedBookToLibrary = createAsyncThunk(
  "books/addRecommendedBookToLibrary",
  async (bookId, thunkAPI) => {
    try {
      const response = await api.post(`/books/add/${bookId}`);

      if (!response || !response.data || !response.data._id) {
        return thunkAPI.rejectWithValue(
          "Sunucudan beklenen kitap verisi gelmedi."
        );
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Hata oluştu."
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

export const removeBookFromLibrary = createAsyncThunk(
  "books/removeBookFromLibrary",
  async (bookId, thunkAPI) => {
    try {
      await bookService.deleteBookFromLibrary(bookId);
      return bookId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Kitap silinemedi"
      );
    }
  }
);
