import { twMerge } from "tailwind-merge";
import { formatPostTime } from "../helpers/format/date-time.format";
import ImageWithFallback from "./ImageWithFallback";

export type MessageItemInListDTO = {
  messageId: string;
  latestMessage: string;
  time: number;
  isRead: boolean;
  userDisplayName: string;
  userImageUrl: string;
  fromMe: boolean;
};

type MessageItemInListProps = {
  isActive: boolean;
  onCurrentSelectedMessage: (messageId: string) => void;
} & MessageItemInListDTO;

function MessageItemInList({
  messageId,
  latestMessage,
  time,
  isRead,
  userDisplayName,
  userImageUrl,
  fromMe,
  onCurrentSelectedMessage,
  isActive,
}: MessageItemInListProps) {
  return (
    <button
      onClick={() => onCurrentSelectedMessage(messageId)}
      className={twMerge(
        "flex flex-row w-full md:w-96 gap-2 px-4 py-3 hover:bg-gray-100 text-start",
        isActive && "bg-gray-100"
      )}
    >
      <ImageWithFallback
        className="h-12 w-12 rounded-full"
        src={userImageUrl}
        alt="userImage"
      />
      <div className={twMerge("flex-col")}>
        <div className={twMerge(!isRead && "text-gray-900 font-semibold")}>
          {userDisplayName}
        </div>
        <div
          className={twMerge(
            "text-sm",
            !isRead && "font-semibold text-gray-900"
          )}
        >
          {fromMe && (
            <span
              className={twMerge(
                "text-gray-400",
                !isRead && "text-gray-900 font-semibold"
              )}
            >
              You:{" "}
            </span>
          )}
          <span className={twMerge(!isRead && "text-gray-900 font-semibold")}>
            {latestMessage}
          </span>
          <span
            className={twMerge(
              "text-gray-500 ml-2",
              !isRead && "text-gray-900 font-semibold"
            )}
          >
            • {formatPostTime(time)}
          </span>
        </div>
      </div>
    </button>
  );
}

export default MessageItemInList;
