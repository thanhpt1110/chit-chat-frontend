import { useCallback, useState } from "react";
import { formatPostTime } from "../helpers/format/date-time.format";
import { PostDTO } from "../types/data.type";
import { CommentOutlineIcon } from "./icons/CommentOutlineIcon";
import { ShareOutlineIcon } from "./icons/ShareOutlineIcon";
import ImageSlider from "./ImageSlider";
import ImageWithFallback from "./ImageWithFallback";
import ToggleLike from "./ToggleLike";
import ToggleSave from "./ToggleSave";
import UserNameDisplay from "./UserNameDisplay";

type PostCardProps = {
  postData: PostDTO;
};
function PostCard({ postData }: PostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleToggleLike = useCallback(() => {}, []);

  const handleToggleSave = useCallback(() => {}, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <ImageWithFallback
            className="rounded-full h-10 w-10"
            src={postData.postUser.profileImage.url}
            alt={postData.postUser.username}
          />
          <UserNameDisplay username={postData.postUser.username} />
          <div className="text-gray-400">
            {"•"} {formatPostTime(postData.postAt)}
          </div>
        </div>
        <div></div>
      </div>
      <button
        onDoubleClick={() => {
          setIsLiked((prev) => !prev);
          handleToggleLike();
        }}
      >
        <ImageSlider images={postData.postImages.map((image) => image.url)} />
      </button>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start gap-4 mt-1">
          <ToggleLike
            className="hover:opacity-50"
            likeControlFromParent={isLiked}
            handleToggleLike={handleToggleLike}
          />
          <CommentOutlineIcon className="cursor-pointer hover:opacity-50" />
          <ShareOutlineIcon className="cursor-pointer hover:opacity-50" />
        </div>
        <ToggleSave
          className="hover:opacity-50"
          handleToggleSave={handleToggleSave}
        />
      </div>
      <div>
        {postData.likeCount} {"likes"}
      </div>
      <div className="flex flex-row gap-2">
        <UserNameDisplay username={postData.postUser.username} />
        <span>{postData.caption}</span>
      </div>
    </div>
  );
}

export default PostCard;