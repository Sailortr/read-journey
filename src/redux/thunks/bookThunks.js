import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookService from "../../services/bookService";
import api from "../../services/api";
import { showToast } from "../uiSlice";

const norm = (s) => (s || "").trim().toLowerCase();

const existsInLibrary = (list = [], { id, title, author }) => {
  const t = norm(title);
  const a = norm(author);

  return list.some((b) => {
    const bid = b._id || b.id || b.bookId || b.slug;
    if (id && bid && String(bid) === String(id)) return true;

    const bt = norm(b.title);
    const ba = norm(b.author);
    return t && a && bt === t && ba === a;
  });
};

export const fetchLibraryBooks = createAsyncThunk(
  "books/fetchLibraryBooks",
  async (status, thunkAPI) => {
    try {
      const response = await bookService.getLibraryBooks(status);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Kitaplar alınamadı"
      );
    }
  }
);

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommendedBooks",
  async (_, thunkAPI) => {
    try {
      const response = await bookService.getRecommendedBooks();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Önerilen kitaplar alınamadı"
      );
    }
  }
);

export const addRecommendedBookToLibrary = createAsyncThunk(
  "books/addRecommendedBookToLibrary",
  async (bookId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const list = state.books?.books || [];

      const existsById = list.some((b) => (b._id || b.id) === bookId);
      if (existsById) {
        return rejectWithValue({
          code: "duplicate",
          message: "Bu kitap zaten kütüphanende.",
        });
      }

      const res = await api.post(`/books/add/${bookId}`);
      if (!res?.data?._id && !res?.data?.id) {
        return rejectWithValue({
          code: "error",
          message: "Sunucudan beklenen kitap verisi gelmedi.",
        });
      }

      return res.data;
    } catch (error) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message;

      if (
        status === 409 ||
        (typeof msg === "string" && /already|exist|zaten/i.test(msg))
      ) {
        return rejectWithValue({
          code: "duplicate",
          message: msg || "Bu kitap zaten kütüphanende.",
        });
      }

      return rejectWithValue({ code: "error", message: msg || "Hata oluştu." });
    }
  }
);

export const addBookToLibraryThunk = createAsyncThunk(
  "books/addBookToLibrary",
  async (bookData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const lib = state.books?.books || [];

      if (
        existsInLibrary(lib, {
          id: bookData?._id || bookData?.id,
          title: bookData?.title,
          author: bookData?.author,
        })
      ) {
        thunkAPI.dispatch(
          showToast({
            type: "warning",
            message: "Bu kitap zaten kütüphanende.",
          })
        );
        return thunkAPI.rejectWithValue("duplicate");
      }

      const response = await bookService.addBookToLibrary(bookData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Kitap eklenemedi"
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
        error?.response?.data?.message || "Kitap silinemedi"
      );
    }
  }
);
