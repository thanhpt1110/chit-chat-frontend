import { HubConnection } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
import { InfoFillIcon } from "../../../components/icons/InfoFillIcon";
import { PhoneCallOutlineIcon } from "../../../components/icons/PhoneCallOutlineIcon";
import { VideoCallOutlineIcon } from "../../../components/icons/VideoCallOutlineIcon";
import ImageWithFallback from "../../../components/ImageWithFallback";
import { useGetConversationDetailQuery } from "../../../data/conversation/conversation.api";
import { MessageRES } from "../../../data/conversation/conversation.res";
import { GlobalState } from "../../../data/global/global.slice";
import { WEB_SOCKET_EVENT } from "../../../helpers/constants/websocket-event.constant";
import { getActiveTime } from "../../../helpers/format/date-time.format";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { ConversationDTO, UserDTO } from "../../../types/data.type";
import ChatInput from "./ChatInput";
import ConversationInfoExpanded from "./ConversationInfoExpanded";
import Message from "./Message";

type ConversationProps = {
  conversationId: string;
  chatter: UserDTO;
  lastChatterActiveTime: number;
  connection: HubConnection | null;
};

function Conversation({
  chatter,
  lastChatterActiveTime,
  conversationId,
  connection,
}: ConversationProps) {
  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const [conversationData, setConversationData] = useState<ConversationDTO[]>(
    []
  );
  const [isShowConversationInfoExpanded, setIsShowConversationInfoExpanded] =
    useState<boolean>(false);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { data: CONVERSATION_DATA_QUERY } = useGetConversationDetailQuery({
    conversationId,
    messagePageIndex: 0,
    messagePageSize: 100,
  });

  useEffect(() => {
    setConversationData(CONVERSATION_DATA_QUERY?.data || []);
  }, [CONVERSATION_DATA_QUERY?.data]);

  // Handle send message
  const handleSendMessage = useCallback(
    (newMessage: MessageRES) => {
      setConversationData((prev) => [
        ...prev,
        {
          conversationId: newMessage.id,
          senderId: userInfo.userId,
          message: {
            messageId: newMessage.id,
            content: newMessage.messageText,
            time: newMessage.createdOn,
          },
        },
      ]);
    },
    [userInfo.userId]
  );

  const handleReceiveMessage = useCallback(
    (newMessage: MessageRES) => {
      setConversationData((prev) => [
        ...prev,
        {
          conversationId: conversationId,
          senderId: chatter.id,
          message: {
            messageId: newMessage.id,
            content: newMessage.messageText,
            time: newMessage.createdOn,
          },
        },
      ]);
    },
    [chatter.id, conversationId]
  );

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationData]);

  // handle read message

  useEffect(() => {
    connection?.on(WEB_SOCKET_EVENT.NEW_MESSAGE, (message: MessageRES) => {
      if (message.senderId === chatter.id) {
        handleReceiveMessage(message);
      } else {
        handleSendMessage(message);
      }
    });

    return () => {
      connection?.off(WEB_SOCKET_EVENT.NEW_MESSAGE, handleReceiveMessage);
    };
  }, [chatter.id, connection, handleReceiveMessage, handleSendMessage]);

  return (
    <div className="w-full h-full flex flex-row ">
      <div className="w-full h-full flex flex-col">
        {/* Conversation Header */}
        <div className="flex flex-row justify-between py-3 px-4 border-b">
          <div className="flex flex-row gap-2">
            <ImageWithFallback
              className="h-12 w-12 rounded-full"
              alt="avatar"
              src={chatter.profileImage.url}
            />
            <div className="flex flex-col justify-center">
              <span className="font-bold">@{chatter.username}</span>
              <span className="text-sm text-gray-500">
                {getActiveTime(lastChatterActiveTime)}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button onClick={() => {}}>
              <PhoneCallOutlineIcon />
            </button>
            <button
              onClick={() => {
                const videoCallUrl = `/video/${conversationId}`;
                window.open(videoCallUrl, "_blank", "width=800,height=600");
              }}
            >
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
        <div className="h-full overflow-y-auto">
          <div className="px-4 overflow-y-auto flex flex-col justify-end">
            {conversationData.map((messageItem, index) => (
              <Message
                onlyOneMessageInGroup={
                  (index === 0 ||
                    messageItem.senderId !==
                      conversationData[index - 1].senderId) &&
                  (index === conversationData.length - 1 ||
                    messageItem.senderId !==
                      conversationData[index + 1].senderId)
                }
                senderAvatarUrl={chatter.profileImage.url}
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
        </div>

        {/* Chat Input */}
        <ChatInput conversationId={conversationId} />
      </div>
      <ConversationInfoExpanded isShow={isShowConversationInfoExpanded} />
    </div>
  );
}

export default Conversation;
