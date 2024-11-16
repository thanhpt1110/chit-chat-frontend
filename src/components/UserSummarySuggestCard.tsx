import ImageWithFallback from "./ImageWithFallback";

export type UserSuggestData = {
  avatarUrl: string;
  username: string;
  summarySuggestContent: string;
};

type UserSummarySuggestCardProps = {
  actionLabel: string;
  onActionClick: () => void;
} & UserSuggestData;

function UserSummarySuggestCard({
  avatarUrl,
  username,
  summarySuggestContent,
  actionLabel,
  onActionClick,
}: UserSummarySuggestCardProps) {
  return (
    <div className="flex flex-row justify-between mt-4 w-72 max-w-80">
      <div className="flex flex-row items-center gap-2">
        <ImageWithFallback
          className="rounded-full w-12 h-12"
          alt={"user-avatar"}
          src={avatarUrl}
        />
        <div className="flex flex-col">
          <div className="text-sm font-medium">@{username}</div>
          <div className="text-sm text-gray-600">{summarySuggestContent}</div>
        </div>
      </div>
      <button
        onClick={onActionClick}
        className="text-blue-500 hover:opacity-70 text-sm font-medium"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export default UserSummarySuggestCard;