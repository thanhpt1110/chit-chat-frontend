import { PaginationREQ } from "../../types/data.type";

export type GetConversationListItemREQ = PaginationREQ;

export type GetConversationListREQ = {
  conversationId: string;
  messagePageIndex: number;
  messagePageSize: number;
};

export type PostAddNewMessageREQ = {
  conversationId: string;
  messageText: string;
};
