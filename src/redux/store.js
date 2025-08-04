import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookReducer from "./bookSlice";
import readingReducer from "./readingSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    reading: readingReducer,
    ui: uiReducer,
  },
});

export default store;
