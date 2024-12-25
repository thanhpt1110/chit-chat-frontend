import { MessageItemInListDTO } from "../../components/MessageItemInList";
import { ConversationDTO } from "../../types/data.type";
import { GetConversationListItemRES, MessageRES } from "./conversation.res";

export const getMessageListItemDTO = (
  data: GetConversationListItemRES
): MessageItemInListDTO => ({
  messageId: data.id,
  latestMessage: data.lastMessage.messageText,
  time: data.lastMessage.updatedOn,
  isRead: data.isSeen,
  userDisplayName: data.userReceivers[0].displayName,
  userImageUrl: data.userReceivers[0].avatarUrl,
  fromMe: data.lastMessage.senderId === data.userReceivers[0].id,
  receiverId: data.userReceivers[0].id,
});

export const getMessageListDetailDTO = (
  data: MessageRES,
  id: string
): ConversationDTO => ({
  senderId: data.senderId,
  message: {
    messageId: data.id,
    content: data.messageText,
    time: data.updatedOn,
  },
  conversationId: id,
});
