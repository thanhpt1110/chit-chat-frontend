export type UserReceiverRES = {
  id: string;
  displayName: string;
  avatarUrl: string;
};

export type MessageRES = {
  id: string;
  messageText: string;
  createdOn: number;
  updatedOn: number;
  senderId: string;
  conversationId: string;
  status: string;
};

export type GetConversationListItemRES = {
  id: string;
  userReceivers: UserReceiverRES[];
  lastMessage: MessageRES;
  isSeen: boolean;
  userReceiverIds: string[];
};

export type GetConversationDetailRES = {
  id: string;
  userReceivers: UserReceiverRES[];
  userReceiverIds: string[];
  messages: MessageRES[];
};
