import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/users.type";
import { setUserInfo } from "../global/global.slice";
import { LoginRES } from "./auth.response";
import { setIsAuthenticated } from "./auth.slice";

export const loginThunk = createAsyncThunk<void, LoginRES>(
  "auth/login",
  async (loginRES, { dispatch }) => {
    localStorage.setItem("accessToken", loginRES.accessToken);
    localStorage.setItem("refreshToken", loginRES.refreshToken);
    const userInfo: UserInfo = {
      userId: loginRES.user.id,
      username: loginRES.user.displayName,
      ...loginRES.user,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    dispatch(setUserInfo(userInfo));
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
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        dispatch(setUserInfo(userInfo));
        dispatch(setIsAuthenticated(true));
      }
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }
);
