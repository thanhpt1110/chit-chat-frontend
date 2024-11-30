import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { APP_ROUTE } from "../helpers/constants/route.constant";

type UserNameDisplayProps = {
  id: string;
  username: string;
  className?: string;
};

function UserNameDisplay({ id, username, className }: UserNameDisplayProps) {
  const navigate = useNavigate();
  const handleNavigateToUserProfile = () => {
    navigate(APP_ROUTE.MAIN.PROFILE(id));
  };

  return (
    <button onClick={handleNavigateToUserProfile}>
      <span className={twMerge("font-medium", className)}>{username}</span>
    </button>
  );
}

export default UserNameDisplay;
