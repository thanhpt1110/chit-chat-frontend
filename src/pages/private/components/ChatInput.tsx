import { useState } from "react";
import { ShareOutlineIcon } from "../../../components/icons/ShareOutlineIcon";
import { usePostAddNewMessageMutation } from "../../../data/conversation/conversation.api";

type ChatInputProps = {
  conversationId: string;
};

function ChatInput({ conversationId }: ChatInputProps) {
  const [newMessage, setNewMessage] = useState<string>("");

  const [postAddNewMessage] = usePostAddNewMessageMutation();

  const handleAddMessage = async () => {
    if (newMessage.trim() !== "") {
      await postAddNewMessage({
        conversationId: conversationId,
        messageText: newMessage,
      })
        .unwrap()
        .catch((error) => {
          console.error("Error adding new message:", error);
        })
        .then(() => {
          setNewMessage("");
        });
    }
  };

  return (
    <div className="flex flex-row px-4 py-4 gap-3">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddMessage();
          }
        }}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full pl-8 py-2 focus:outline-none rounded-3xl border"
        placeholder="Type a message"
        type="text"
      />
      <button onClick={handleAddMessage}>
        <ShareOutlineIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ChatInput;
