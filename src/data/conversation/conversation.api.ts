import { MessageItemInListDTO } from "../../components/MessageItemInList";
import {
  HTTP_METHOD,
  TAG_TYPES,
} from "../../helpers/constants/common.constant";
import {
  BaseResponse,
  ConversationDTO,
  PaginationDTO,
} from "../../types/data.type";
import { usersApi } from "../usersApi.api";
import {
  GetConversationListItemREQ,
  GetConversationListREQ,
  PostAddNewMessageREQ,
} from "./conversation.req";
import {
  GetConversationDetailRES,
  GetConversationListItemRES,
} from "./conversation.res";
import {
  getMessageListDetailDTO,
  getMessageListItemDTO,
} from "./conversation.service";

export const GET_CONVERSATION_LIST_PAGE_SIZE = 10;
export const GET_CONVERSATION_DETAIL_PAGE_SIZE = 100;

const conversationApi = usersApi.injectEndpoints({
  endpoints: (build) => ({
    getConversationList: build.query<
      PaginationDTO<MessageItemInListDTO>,
      GetConversationListItemREQ
    >({
      query: (params) => ({
        url: `/Conversation`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (
        response: BaseResponse<GetConversationListItemRES[]>
      ) => ({
        data: response.result.map((conversation) =>
          getMessageListItemDTO(conversation)
        ),
        isLastPage: response.result.length < GET_CONVERSATION_LIST_PAGE_SIZE,
      }),
      providesTags: [TAG_TYPES.CONVERSATION_LIST],
    }),
    getConversationDetail: build.query<
      PaginationDTO<ConversationDTO>,
      GetConversationListREQ
    >({
      query: (params) => ({
        url: `/Conversation/${params.conversationId}`,
        method: HTTP_METHOD.GET,
        params,
      }),
      transformResponse: (
        response: BaseResponse<GetConversationDetailRES>
      ) => ({
        data: response.result.messages.map((message) =>
          getMessageListDetailDTO(message, response.result.id)
        ),
        isLastPage:
          response.result.messages.length < GET_CONVERSATION_DETAIL_PAGE_SIZE,
      }),
    }),
    postAddNewMessage: build.mutation<void, PostAddNewMessageREQ>({
      query: ({ conversationId, messageText }) => ({
        url: `/Conversation/${conversationId}`,
        method: HTTP_METHOD.POST,
        body: {
          messageText,
        },
      }),
      invalidatesTags: [{ type: TAG_TYPES.CONVERSATION_LIST }],
    }),
  }),
});

export const {
  useGetConversationListQuery,
  useGetConversationDetailQuery,
  usePostAddNewMessageMutation,
} = conversationApi;
