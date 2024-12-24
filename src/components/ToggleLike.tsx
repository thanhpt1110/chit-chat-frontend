import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { LikeFillIcon } from "./icons/LikeFillIcon";
import { LikeOutLineIcon } from "./icons/LikeOutlineIcon";

type ToggleLikeProps = {
  likeControlFromParent?: boolean;
  handleToggleLike: () => void;
  likeIconClassName?: string;
  className?: string;
};

function ToggleLike({
  handleToggleLike,
  likeControlFromParent,
  likeIconClassName,
  className,
}: ToggleLikeProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (likeControlFromParent !== undefined) {
      setIsLiked(likeControlFromParent);
    }
  }, [likeControlFromParent]);

  return (
    <button
      onClick={() => {
        setIsLiked((prev) => !prev);
        handleToggleLike();
      }}
      className={className}
    >
      {!isLiked ? (
        <LikeOutLineIcon className={twMerge("h-6 w-6", likeIconClassName)} />
      ) : (
        <LikeFillIcon
          className={twMerge("text-[#F0355B]", likeIconClassName)}
        />
      )}
    </button>
  );
}

export default ToggleLike;
