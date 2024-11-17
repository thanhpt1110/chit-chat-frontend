import { twMerge } from "tailwind-merge";
import ImageWithFallback from "./ImageWithFallback";
import UserNameDisplay from "./UserNameDisplay";

type UserDisplayNameAndContentProps = {
  userDisplayName: string;
  content: string;
  children?: React.ReactNode;
  userAvatarUrl: string;
  imageClassName?: string;
};

function UserDisplayNameAndContent({
  userDisplayName,
  content,
  userAvatarUrl,
  children,
  imageClassName,
}: UserDisplayNameAndContentProps) {
  return (
    <div className="flex flex-row w-full items-start">
      <ImageWithFallback
        className={twMerge("h-10 w-10 rounded-full", imageClassName)}
        alt={userDisplayName}
        src={userAvatarUrl}
      />
      <div className="flex ml-2 flex-col">
        <div>
          <UserNameDisplay className="mr-2" username={userDisplayName} />
          <span>{content}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default UserDisplayNameAndContent;
