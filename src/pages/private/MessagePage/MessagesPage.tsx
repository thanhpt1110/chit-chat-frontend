import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { OpenSendNewMessageOutlineIcon } from "../../../components/icons/OpenSendNewMessageOutlineIcon";
import MessageItemInList from "../../../components/MessageItemInList";
import UserNameDisplay from "../../../components/UserNameDisplay";
import {
  GET_CONVERSATION_LIST_PAGE_SIZE,
  useGetConversationListQuery,
} from "../../../data/conversation/conversation.api";
import { GlobalState } from "../../../data/global/global.slice";
import { socketBaseUrl } from "../../../helpers/constants/configs.constant";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { UserDTO } from "../../../types/data.type";
import Conversation from "../components/Conversation";

function MessagesPage() {
  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const { data: messageListData } = useGetConversationListQuery({
    PageIndex: 0,
    PageSize: GET_CONVERSATION_LIST_PAGE_SIZE,
  });

  const [chatter, setChatter] = useState<UserDTO>();

  const [selectedMessageId, setSelectedMessageId] = useState<string>(
    messageListData?.data?.[0].messageId || ""
  );
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const setupSignalR = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${socketBaseUrl}/hubs/conversation`, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      try {
        await newConnection.start();
        setConnection(newConnection);
        console.log("SignalR connection established");
      } catch (error) {
        console.error(
          "SignalR connection error:",
          JSON.stringify(error, null, 2)
        );
      }
    };

    setupSignalR();

    return () => {
      connection?.stop();
    };
  }, []);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="border flex flex-col md:w-[420px] h-full overflow-auto">
        <div className="flex flex-row justify-between px-4 pt-8">
          <UserNameDisplay
            id={userInfo.userId}
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
        <div className="flex flex-col mx-3">
          {messageListData?.data.map((message) => (
            <MessageItemInList
              connection={connection}
              onCurrentSelectedMessage={() =>
                setSelectedMessageId(message.messageId)
              }
              setChatter={setChatter}
              isActive={selectedMessageId === message.messageId}
              key={message.messageId}
              messageItemData={message}
            />
          ))}
          {/* {messageListData?.data.length === 0 && <></>}
          <div className="h-full flex flex-col justify-center items-center">
            <ImageWithFallback
              className="h-24 w-24"
              src="/assets/images/empty-message.svg"
              alt="empty-message"
            />
            {
              "No messages yet. Start a conversation by sending a message to someone."
            }
          </div> */}
        </div>
      </div>
      {chatter && (
        <Conversation
          connection={connection}
          lastChatterActiveTime={Date.now()}
          chatter={chatter}
          conversationId={selectedMessageId}
        />
      )}
    </div>
  );
}

export default MessagesPage;
