import { HTTP_METHOD } from "../../helpers/constants/common.constant";
import { GET_EXPLORE_LIST_PAGE_SIZE } from "../../pages/private/ExplorePage/ExplorePage";
import {
  BaseResponse,
  ExploreItemInListDTO,
  PaginationDTO,
} from "../../types/data.type";
import { GetListPostRES } from "../post/post.response";
import { usersApi } from "../usersApi.api";
import { GetListExploreREQ } from "./explore.request";
import { getExploreItemInListDTO } from "./explore.service";

const exploreApi = usersApi.injectEndpoints({
  endpoints: (build) => ({
    getExploreList: build.query<
      PaginationDTO<ExploreItemInListDTO>,
      GetListExploreREQ
    >({
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
      //   const existingIds = new Set(
      //     currentCache.data.map((item) => item.postId)
      //   );

      //   newItems.data.forEach((newItem) => {
      //     if (!existingIds.has(newItem.postId)) {
      //       currentCache.data.push(newItem);
      //     }
      //   });

      //   if (newItems.data.length < GET_EXPLORE_LIST_PAGE_SIZE) {
      //     currentCache.isLastPage = true;
      //   }
      // },
      transformResponse: (response: BaseResponse<GetListPostRES[]>) => {
        return {
          data: response.result.map((post) => getExploreItemInListDTO(post)),
          isLastPage: response.result.length < GET_EXPLORE_LIST_PAGE_SIZE,
        };
      },
    }),
  }),
});

export const { useGetExploreListQuery, useLazyGetExploreListQuery } =
  exploreApi;
