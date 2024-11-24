import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { TAG_TYPES } from "../helpers/constants/common.constant";
import { apiBaseUrl } from "../helpers/constants/configs.constant";
import { logoutThunk } from "./auth/auth.thunk";

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(logoutThunk());
  }
  return result;
};

export const usersApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: [TAG_TYPES.POST],
});
