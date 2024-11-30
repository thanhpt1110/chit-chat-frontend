import { HTTP_METHOD } from "../../helpers/constants/common.constant";
import { BaseResponse, ProfileDetailDTO } from "../../types/data.type";
import { usersApi } from "../usersApi.api";
import { GetProfileSearchREQ } from "./profile.request";
import { GetProfileDetailRES, GetProfileSearchRES } from "./profile.response";
import {
  ProfileSearchDTO,
  getProfileDetailDTO,
  getProfileSearchDTO,
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
    }),
  }),
});

export const { useLazyGetProfileSearchQuery, useGetProfileDetailQuery } =
  profileApi;
