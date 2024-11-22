import { useState } from "react";
import { OpenSendNewMessageOutlineIcon } from "../../../components/icons/OpenSendNewMessageOutlineIcon";
import MessageItemInList, {
  MessageItemInListDTO,
} from "../../../components/MessageItemInList";
import UserNameDisplay from "../../../components/UserNameDisplay";
import { GlobalState } from "../../../data/global/global.slice";
import { useAppSelector } from "../../../hooks/reduxHooks";
import Conversation from "../components/Conversation";

const MESSAGES_DATA: MessageItemInListDTO[] = [
  {
    messageId: "1",
    latestMessage: "Hello",
    time: Date.now(),
    isRead: true,
    userDisplayName: "John Doe",
    userImageUrl: "https://avatar.iran.liara.run/public/boy",
    fromMe: false,
  },
  {
    messageId: "2",
    latestMessage: "Hi",
    time: Date.now(),
    isRead: false,
    userDisplayName: "Jane Doe",
    userImageUrl: "https://avatar.iran.liara.run/public/girl",
    fromMe: true,
  },
  {
    messageId: "3",
    latestMessage: "How are you?",
    time: Date.now(),
    isRead: true,
    userDisplayName: "John Doe",
    userImageUrl: "https://avatar.iran.liara.run/public",
    fromMe: false,
  },
];

function MessagesPage() {
  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const [selectedMessageId, setSelectedMessageId] = useState<string>(
    MESSAGES_DATA[0].messageId
  );

  return (
    <div className="flex flex-row h-full">
      <div className="border flex flex-col h-full overflow-auto">
        <div className="flex flex-row justify-between px-4 pt-8">
          <UserNameDisplay
            className="text-blue-400"
            username={`@${userInfo.username}`}
          />
          <button>
            <OpenSendNewMessageOutlineIcon />
          </button>
        </div>
        <div className="flex flex-row px-4 py-2">
          <div className="font-bold">Messages</div>
        </div>
        <div className="flex flex-col">
          {MESSAGES_DATA.map((message) => (
            <MessageItemInList
              onCurrentSelectedMessage={() =>
                setSelectedMessageId(message.messageId)
              }
              isActive={selectedMessageId === message.messageId}
              key={message.messageId}
              {...message}
            />
          ))}
        </div>
      </div>
      <Conversation
        lastSenderActiveTime={Date.now()}
        sender={{
          id: "1",
          username: "John Doe",
          profileImage: {
            key: "1",
            url: "https://avatar.iran.liara.run/public/boy",
          },
          userDisplayName: "Tuan Le",
        }}
        conversationId={selectedMessageId}
      />
    </div>
  );
}

export default MessagesPage;
