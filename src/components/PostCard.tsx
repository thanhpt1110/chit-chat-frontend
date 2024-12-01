import { enqueueSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { usePutLikePostMutation } from "../data/post/post.api";
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
  onCommentClick?: () => void;
};
function PostCard({ postData, onCommentClick }: PostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(postData.isLiked);

  const [putToggleLike] = usePutLikePostMutation();

  const handleToggleLike = useCallback(() => {
    putToggleLike(postData.id)
      .unwrap()
      .then(() => {
        enqueueSnackbar("success liked", {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("error", {
          variant: "error",
        });
      });
  }, [postData.id, putToggleLike]);

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
          <UserNameDisplay
            id={postData.postUser.id}
            username={postData.postUser.username}
          />
          <div className="text-gray-400 text-sm">
            {"•"} {formatPostTime(postData.postAt)}
          </div>
        </div>
        <div></div>
      </div>
      <div
        className="cursor-pointer"
        onDoubleClick={() => {
          setIsLiked((prev) => !prev);
          handleToggleLike();
        }}
      >
        <ImageSlider
          className="max-w-[400px] "
          images={postData.postImages.map((image) => image.url)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start gap-4 mt-1">
          <ToggleLike
            className="hover:opacity-50"
            likeControlFromParent={isLiked}
            handleToggleLike={handleToggleLike}
          />
          <button onClick={onCommentClick}>
            <CommentOutlineIcon className="cursor-pointer hover:opacity-50" />
          </button>
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
      <div className="flex flex-row gap-2 items-start max-w-[400px]">
        <UserNameDisplay
          id={postData.postUser.id}
          className="text-sm"
          username={postData.postUser.username}
        />
        <span className="line-clamp-3 text-sm">{postData.caption}</span>
      </div>
      <button
        onClick={onCommentClick}
        className="text-sm text-gray-500 text-start"
      >{`View all ${postData.commentCount} comments`}</button>
    </div>
  );
}

export default PostCard;
