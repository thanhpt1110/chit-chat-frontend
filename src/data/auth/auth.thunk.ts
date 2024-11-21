import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRES } from "./auth.response";
import { setIsAuthenticated } from "./auth.slice";

export const loginThunk = createAsyncThunk<void, LoginRES>(
  "auth/login",
  async (loginRES, { dispatch }) => {
    localStorage.setItem("accessToken", loginRES.accessToken);
    localStorage.setItem("refreshToken", loginRES.refreshToken);
    dispatch(setIsAuthenticated(true));
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setIsAuthenticated(false));
  }
);

export const syncAccessTokenThunk = createAsyncThunk<void, void>(
  "auth/sync-access-token",
  (_, { dispatch }) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }
);
