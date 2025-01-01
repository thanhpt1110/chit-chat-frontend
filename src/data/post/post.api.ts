import {
  HTTP_METHOD,
  TAG_TYPES,
} from "../../helpers/constants/common.constant";
import { GET_POST_HOME_PAGE_SIZE } from "../../pages/private/HomePage/HomePage";
import { GET_POST_PROFILE_PAGE_SIZE } from "../../pages/private/ProfilePage/ProfilePage";
import {
  BaseResponse,
  PaginationDTO,
  PostDetailDTO,
  PostDTO,
} from "../../types/data.type";
import { usersApi } from "../usersApi.api";
import { GetListPostREQ } from "./post.request";
import { GetListPostRES, GetPostDetailRES } from "./post.response";
import { getPostDetailDTO, getPostDTO } from "./post.service";

const postApi = usersApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PaginationDTO<PostDTO>, GetListPostREQ>({
      query: (params) => ({
        url: `/Post/reccomendation`,
        method: HTTP_METHOD.GET,
        params,
      }),
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // },
      // merge: (currentCache, newItems) => {
      //   const existingIds = new Set(currentCache.data.map((item) => item.id));

      //   newItems.data.forEach((newItem) => {
      //     if (!existingIds.has(newItem.id)) {
      //       currentCache.data.push(newItem);
      //     }
      //   });

      //   if (newItems.data.length < GET_POST_HOME_PAGE_SIZE) {
      //     currentCache.isLastPage = true;
      //   }
      // },
      transformResponse: (response: BaseResponse<GetListPostRES[]>) => {
        return {
          data: response.result.map((post) => getPostDTO(post)),
          isLastPage: response.result.length < GET_POST_HOME_PAGE_SIZE,
        };
      },
      providesTags: [
        {
          type: TAG_TYPES.POST,
          id: "LIST",
        },
      ],
    }),
    createPost: build.mutation<void, FormData>({
      query: (body) => ({
        url: `/Post`,
        method: HTTP_METHOD.POST,
        body,
      }),
      invalidatesTags: [{ type: TAG_TYPES.POST, id: "LIST" }],
    }),
    getPostDetail: build.query<PostDetailDTO, string>({
      query: (id: string) => ({
        url: `/Post/${id}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: BaseResponse<GetPostDetailRES>) =>
        getPostDetailDTO(response.result),
      providesTags: (result, error, id) => [{ type: TAG_TYPES.POST, id: id }],
    }),
    putLikePost: build.mutation<void, string>({
      query: (id: string) => ({
        url: `/Post/${id}/react`,
        method: HTTP_METHOD.PUT,
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: TAG_TYPES.POST,
          id: id,
        },
        {
          type: TAG_TYPES.POST,
          id: "LIST",
        },
      ],
    }),
    getUserPosts: build.query<PaginationDTO<PostDTO>, GetListPostREQ>({
      query: (params) => ({
        url: `/Post`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (response: BaseResponse<GetListPostRES[]>) => {
        return {
          data: response.result.map((post) => getPostDTO(post)),
          isLastPage: response.result.length < GET_POST_PROFILE_PAGE_SIZE,
        };
      },
      providesTags: [
        {
          type: TAG_TYPES.POST,
          id: "LIST",
        },
      ],
    }),
    postComment: build.mutation<void, { postId: string; content: string }>({
      query: ({ postId, content }) => ({
        url: `/Post/${postId}/comments`,
        method: HTTP_METHOD.POST,
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        {
          type: TAG_TYPES.POST,
          id: postId,
        },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetPostDetailQuery,
  usePutLikePostMutation,
  useGetUserPostsQuery,
  usePostCommentMutation,
} = postApi;
