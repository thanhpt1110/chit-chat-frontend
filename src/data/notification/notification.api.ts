import { HTTP_METHOD } from "../../helpers/constants/common.constant";
import {
  BaseResponse,
  NotificationDTO,
  PaginationDTO,
} from "../../types/data.type";
import { usersApi } from "../usersApi.api";
import { GetListNotificationREQ } from "./notification.req";
import { GetNotificationRES } from "./notification.res";
import { getNotificationDTO } from "./notification.service";

export const GET_NOTIFICATION_PAGE_SIZE = 10;

const notificationApi = usersApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<
      PaginationDTO<NotificationDTO>,
      GetListNotificationREQ
    >({
      query: (params) => ({
        url: `/Notification`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (response: BaseResponse<GetNotificationRES[]>) => {
        return {
          data: response.result.map((item) => getNotificationDTO(item)),
          isLastPage: response.result.length < GET_NOTIFICATION_PAGE_SIZE,
        };
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
