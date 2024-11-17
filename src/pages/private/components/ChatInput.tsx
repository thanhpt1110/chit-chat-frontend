import { useState } from "react";
import { ShareOutlineIcon } from "../../../components/icons/ShareOutlineIcon";

type ChatInputProps = {
  handleSendMessage: (newMessage: string) => void;
};

function ChatInput({ handleSendMessage }: ChatInputProps) {
  const [newMessage, setNewMessage] = useState<string>("");
  return (
    <div className="flex flex-row px-4 py-4 gap-3">
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full pl-8 py-2 focus:outline-none rounded-3xl border"
        placeholder="Type a message"
        type="text"
      />
      <button
        onClick={() => {
          handleSendMessage(newMessage);
          setNewMessage("");
        }}
      >
        <ShareOutlineIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ChatInput;
