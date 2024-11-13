import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsAuthenticated } from "./auth.slice";

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("accessToken");
    dispatch(setIsAuthenticated(false));
  }
);

export const syncAccessTokenThunk = createAsyncThunk<void, void>(
  "auth/sync-access-token",
  (_, { dispatch }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }
);
