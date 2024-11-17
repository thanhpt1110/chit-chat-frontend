import { useCallback, useEffect, useRef, useState } from "react";
import { InfoFillIcon } from "../../../components/icons/InfoFillIcon";
import { PhoneCallOutlineIcon } from "../../../components/icons/PhoneCallOutlineIcon";
import { VideoCallOutlineIcon } from "../../../components/icons/VideoCallOutlineIcon";
import ImageWithFallback from "../../../components/ImageWithFallback";
import { GlobalState } from "../../../data/global/global.slice";
import { generateConversationDataRealistic } from "../../../data/mocks/conversation.mock";
import { getActiveTime } from "../../../helpers/format/date-time.format";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { ConversationDTO, UserDTO } from "../../../types/data.type";
import ChatInput from "./ChatInput";
import ConversationInfoExpanded from "./ConversationInfoExpanded";
import Message from "./Message";

type ConversationProps = {
  conversationId: string;
  sender: UserDTO;
  lastSenderActiveTime: number;
};

const CONVERSATION_DATA: ConversationDTO[] =
  generateConversationDataRealistic(100);

function Conversation({
  conversationId,
  sender,
  lastSenderActiveTime,
}: ConversationProps) {
  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const [conversationData, setConversationData] =
    useState<ConversationDTO[]>(CONVERSATION_DATA);

  const [isShowConversationInfoExpanded, setIsShowConversationInfoExpanded] =
    useState<boolean>(false);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Handle send message
  const handleSendMessage = useCallback(
    (newMessage: string) => {
      setConversationData((prev) => [
        ...prev,
        {
          senderId: userInfo.userId,
          message: {
            messageId: Date.now().toString(),
            content: newMessage,
            time: Date.now(),
          },
        },
      ]);
    },
    [userInfo.userId]
  );

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationData]);

  // handle read message

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-full h-full flex flex-col">
        {/* Conversation Header */}
        <div className="flex flex-row justify-between py-3 border-b">
          <div className="flex flex-row gap-2">
            <ImageWithFallback
              className="h-12 w-12 rounded-full"
              alt="avatar"
              src={sender.profileImage.url}
            />
            <div className="flex flex-col justify-center">
              <span className="font-bold">@{sender.username}</span>
              <span className="text-sm text-gray-500">
                {getActiveTime(lastSenderActiveTime)}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-4 mr-4">
            <button onClick={() => {}}>
              <PhoneCallOutlineIcon />
            </button>
            <button onClick={() => {}}>
              <VideoCallOutlineIcon />
            </button>
            <button
              onClick={() => {
                setIsShowConversationInfoExpanded((prev) => !prev);
              }}
            >
              <InfoFillIcon className="h-6 w-6 overflow-visible" />
            </button>
          </div>
        </div>

        {/* Conversation Messages */}
        <div className="px-4 overflow-auto">
          {conversationData.map((messageItem, index) => (
            <Message
              onlyOneMessageInGroup={
                (index === 0 ||
                  messageItem.senderId !==
                    conversationData[index - 1].senderId) &&
                (index === conversationData.length - 1 ||
                  messageItem.senderId !== conversationData[index + 1].senderId)
              }
              senderAvatarUrl="https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4394.jpg"
              isFirst={
                (index === 0 ||
                  messageItem.senderId !==
                    conversationData[index - 1].senderId) &&
                index < conversationData.length - 1 &&
                messageItem.senderId === conversationData[index + 1].senderId
              }
              isLast={
                (index === conversationData.length - 1 ||
                  messageItem.senderId !==
                    conversationData[index + 1].senderId) &&
                index > 0 &&
                messageItem.senderId === conversationData[index - 1].senderId
              }
              key={messageItem.message.messageId}
              message={messageItem.message.content}
              isFromSender={messageItem.senderId !== userInfo.userId}
              time={messageItem.message.time}
            />
          ))}
          <div ref={lastMessageRef}></div>
        </div>

        {/* Chat Input */}
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
      <ConversationInfoExpanded isShow={isShowConversationInfoExpanded} />
    </div>
  );
}

export default Conversation;
