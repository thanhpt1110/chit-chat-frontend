import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import ImageWithFallback from "../../../components/ImageWithFallback";
import { GlobalState } from "../../../data/global/global.slice";
import { formatPostTime } from "../../../helpers/format/date-time.format";
import { useAppSelector } from "../../../hooks/reduxHooks";

type MessageProps = {
  message: string;
  time: number;
  isFirst: boolean;
  isLast: boolean;
  isFromSender: boolean;
  senderAvatarUrl: string;
  onlyOneMessageInGroup: boolean;
};
function Message({
  message,
  time,
  isFirst,
  isLast,
  isFromSender,
  senderAvatarUrl,
  onlyOneMessageInGroup,
}: MessageProps) {
  const isDisplaySenderAvatar = useMemo(
    () => isFromSender && (isLast || onlyOneMessageInGroup),
    [isFromSender, isLast, onlyOneMessageInGroup]
  );

  const isDisplayReceiverAvatar = useMemo(
    () => !isFromSender && (isLast || onlyOneMessageInGroup),
    [isFromSender, isLast, onlyOneMessageInGroup]
  );

  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  return (
    <div
      className={twMerge(
        isFromSender && "justify-start",
        !isFromSender && " justify-end",
        "w-full",
        "flex flex-row items-center gap-2"
      )}
    >
      {/* Sender image */}
      <ImageWithFallback
        className={twMerge(
          "h-8 w-8 rounded-full",
          !isDisplaySenderAvatar && "opacity-0"
        )}
        src={senderAvatarUrl}
        alt="sender-avatar"
      />

      <div
        className={twMerge(
          "w-max max-w-xl relative px-4 py-2 mt-0.5",
          "rounded-3xl",
          isFromSender && "bg-gray-200",
          !isFromSender && "bg-blue-500 text-white",
          isFirst && isFromSender && "rounded-bl-md",
          isLast && isFromSender && "rounded-tl-md",
          !isFirst && !isLast && isFromSender && "rounded-l-md",
          isFirst && !isFromSender && "rounded-br-md",
          isLast && !isFromSender && "rounded-tr-md",
          !isFirst && !isLast && !isFromSender && "rounded-r-md",
          onlyOneMessageInGroup && "rounded-3xl",
          isFirst && "mt-2",
          isLast && "mb-2",
          onlyOneMessageInGroup && "my-2"
        )}
      >
        {message}
        {/* Tooltip for time */}
        <span
          className={twMerge(
            "absolute hidden group-hover:flex -bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-lg"
          )}
        >
          {formatPostTime(time)}
        </span>
      </div>

      <ImageWithFallback
        className={twMerge(
          "h-8 w-8 rounded-full",
          !isDisplayReceiverAvatar && "opacity-0"
        )}
        src={userInfo.avatarUrl}
        alt="receiver-avatar"
      />
    </div>
  );
}

export default Message;
