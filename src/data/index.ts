import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./auth/auth.slice";
import { globalSlice } from "./global/global.slice";
import { usersApi } from "./usersApi.api";
import authApi from "./auth/auth.api";

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(authApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
