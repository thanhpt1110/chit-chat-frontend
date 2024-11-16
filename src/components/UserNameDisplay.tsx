import { twMerge } from "tailwind-merge";

type UserNameDisplayProps = {
  username: string;
  className?: string;
};

function UserNameDisplay({ username, className }: UserNameDisplayProps) {
  const handleNavigateToUserProfile = () => {};

  return (
    <button onClick={handleNavigateToUserProfile}>
      <span className={twMerge("font-medium", className)}>{username}</span>
    </button>
  );
}

export default UserNameDisplay;
