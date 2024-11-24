import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { APP_ROUTE } from "../helpers/constants/route.constant";

type UserNameDisplayProps = {
  username: string;
  className?: string;
};

function UserNameDisplay({ username, className }: UserNameDisplayProps) {
  const navigate = useNavigate();
  const handleNavigateToUserProfile = () => {
    navigate(APP_ROUTE.MAIN.PROFILE(username));
  };

  return (
    <button onClick={handleNavigateToUserProfile}>
      <span className={twMerge("font-medium", className)}>{username}</span>
    </button>
  );
}

export default UserNameDisplay;
