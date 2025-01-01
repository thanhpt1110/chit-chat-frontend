import {
  HTTP_METHOD,
  TAG_TYPES,
} from "../../helpers/constants/common.constant";
import { BaseResponse, ProfileDetailDTO, UserDTO } from "../../types/data.type";
import { RecommendUserRES } from "../../types/users.type";
import { usersApi } from "../usersApi.api";
import { GetProfileSearchREQ, GetRecommendUserREQ } from "./profile.request";
import { GetProfileDetailRES, GetProfileSearchRES } from "./profile.response";
import {
  ProfileSearchDTO,
  getProfileDetailDTO,
  getProfileSearchDTO,
  getRecommendUserDTO,
} from "./profile.service";

const profileApi = usersApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileSearch: build.query<ProfileSearchDTO[], GetProfileSearchREQ>({
      query: (params) => ({
        url: "/Profile",
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (response: BaseResponse<GetProfileSearchRES[]>) =>
        response.result.map((profile) => getProfileSearchDTO(profile)),
    }),

    getProfileDetail: build.query<ProfileDetailDTO, string>({
      query: (id: string) => ({
        url: `/Profile/${id}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: BaseResponse<GetProfileDetailRES>) =>
        getProfileDetailDTO(response.result),
      providesTags: (result, error, id) => [
        { type: TAG_TYPES.PROFILE, id: id },
      ],
    }),
    toggleFollow: build.mutation<void, string>({
      query: (id: string) => ({
        url: `/Profile/toggle-follow/${id}`,
        method: HTTP_METHOD.PUT,
      }),
      invalidatesTags: (result, error, id) => [{ type: TAG_TYPES.PROFILE, id }],
    }),
    getRecommendUsers: build.query<UserDTO[], GetRecommendUserREQ>({
      query: (params) => ({
        url: `/Profile/get-reccommend-user`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (response: BaseResponse<RecommendUserRES[]>) => {
        return response.result.map((user) => getRecommendUserDTO(user));
      },
    }),
  }),
});

export const {
  useLazyGetProfileSearchQuery,
  useGetProfileDetailQuery,
  useToggleFollowMutation,
  useGetRecommendUsersQuery,
} = profileApi;
