import { HTTP_METHOD } from "../../helpers/constants/common.constant";
import { BaseResponse, ExploreItemInListDTO } from "../../types/data.type";
import { GetListPostRES } from "../post/post.response";
import { usersApi } from "../usersApi.api";
import { GetListExploreREQ } from "./explore.request";
import { getExploreItemInListDTO } from "./explore.service";

const exploreApi = usersApi.injectEndpoints({
  endpoints: (build) => ({
    getExploreList: build.query<ExploreItemInListDTO[], GetListExploreREQ>({
      query: (params) => ({
        url: `/Post/reccomendation`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (response: BaseResponse<GetListPostRES[]>) => {
        return response.result.map((post) => getExploreItemInListDTO(post));
      },
    }),
  }),
});

export const { useGetExploreListQuery } = exploreApi;
