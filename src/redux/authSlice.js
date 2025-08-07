import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  restoreUserFromLocalStorage,
} from "./thunks/authThunks";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { name, email, token } = action.payload;
        state.user = { name, email };
        state.token = token;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { name, email, token } = action.payload;
        state.user = { name, email };
        state.token = token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(restoreUserFromLocalStorage.fulfilled, (state, action) => {
        const { name, email, token } = action.payload;
        state.user = { name, email };
        state.token = token;
      })

      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;
