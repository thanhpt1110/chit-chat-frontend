import { useState } from "react";
import Conversation from "../components/Conversation";
import UserNameDisplay from "../../../components/UserNameDisplay";
import { OpenSendNewMessageOutlineIcon } from "../../../components/icons/OpenSendNewMessageOutlineIcon";
import MessageItemInList, { MessageItemInListDTO } from "../../../components/MessageItemInList";
import { GlobalState } from "../../../data/global/global.slice";
import { useAppSelector } from "../../../hooks/reduxHooks";
 
const MESSAGES_DATA: MessageItemInListDTO[] = [
  {
    messageId: "1",
    latestMessage: "Hello",
    time: Date.now(),
    isRead: true,
    userDisplayName: "John Doe",
    userImageUrl: "https://randomuser.me/api/port",
    fromMe: false,
  },
  {
    messageId: "2",
    latestMessage: "Hi",
    time: Date.now(),
    isRead: false,
    userDisplayName: "Jane Doe",
    userImageUrl: "https://randomuser.me/api/port",
    fromMe: true,
  },
  {
    messageId: "3",
    latestMessage: "How are you?",
    time: Date.now(),
    isRead: true,
    userDisplayName: "John Doe",
    userImageUrl: "https://randomuser.me/api/port",
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
          username: "lttuan_",
          profileImage: {
            key: "1",
            url: "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4394.jpg",
          },
          userDisplayName: "Tuan Le",
        }}
        conversationId={selectedMessageId}
      />
    </div>
  );
}

export default MessagesPage;
