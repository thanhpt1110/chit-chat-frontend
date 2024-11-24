import {
  HTTP_METHOD,
  TAG_TYPES,
} from "../../helpers/constants/common.constant";
import { BaseResponse, PostDTO } from "../../types/data.type";
import { usersApi } from "../usersApi.api";
import { GetListPostREQ } from "./post.request";
import { GetListPostRES } from "./post.response";
import { getPostDTO } from "./post.service";

const postApi = usersApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostDTO[], GetListPostREQ>({
      query: (params) => ({
        url: `/Post`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (response: BaseResponse<GetListPostRES[]>) => {
        return response.result.map((post) => getPostDTO(post));
      },
      providesTags: [TAG_TYPES.POST],
    }),
    createPost: build.mutation<void, FormData>({
      query: (body) => ({
        url: `/Post`,
        method: HTTP_METHOD.POST,
        body,
      }),
      invalidatesTags: [{ type: TAG_TYPES.POST }],
    }),
    getExploreList: build.query<PostDTO[], GetListPostREQ>({
      query: (params) => ({
        url: `/Post/reccomendation`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (response: BaseResponse<GetListPostRES[]>) => {
        return response.result.map((post) => getPostDTO(post));
      },
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = postApi;
