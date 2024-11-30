import SkeletonImage from "antd/es/skeleton/Image";
import { useCallback, useState } from "react";
import { CommentOutlineIcon } from "../../../components/icons/CommentOutlineIcon";
import { ShareOutlineIcon } from "../../../components/icons/ShareOutlineIcon";
import ImageSlider from "../../../components/ImageSlider";
import ImageWithFallback from "../../../components/ImageWithFallback";
import { Modal } from "../../../components/Modal";
import ToggleLike from "../../../components/ToggleLike";
import ToggleSave from "../../../components/ToggleSave";
import UserDisplayNameAndContent from "../../../components/UserDisplayNameAndContent";
import UserNameDisplay from "../../../components/UserNameDisplay";
import { useGetPostDetailQuery } from "../../../data/post/post.api";
import { formatPostTime } from "../../../helpers/format/date-time.format";

type PostDetailModalProps = {
  postId: string | null;
  onClose: () => void;
};

function PostDetailModal({ postId, onClose }: PostDetailModalProps) {
  const {
    data: postDetailData,
    isLoading,
    isFetching,
  } = useGetPostDetailQuery(postId || "", {
    skip: !postId,
  });

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleToggleLike = useCallback(() => {}, []);

  const handleToggleSave = useCallback(() => {}, []);

  return (
    <div className="">
      {/* Modal */}
      <Modal
        className="h-[600px]  w-max"
        isOpen={!!postId}
        onClose={onClose}
        content={
          <>
            <div className="flex flex-row h-full justify-between bg-black">
              <button
                onDoubleClick={() => {
                  setIsLiked((prev) => !prev);
                  handleToggleLike();
                }}
              >
                {!isLoading && !isFetching ? (
                  <>
                    {postDetailData && (
                      <ImageSlider
                        imageClassName="h-[600px] w-[600px]"
                        className="items-center self-center"
                        images={postDetailData.post.postImages.map(
                          (image) => image.url
                        )}
                      />
                    )}
                  </>
                ) : (
                  <div className="h-[600px] w-[600px]">
                    <SkeletonImage className="!h-full !w-full" />
                  </div>
                )}
              </button>
              <div className="bg-white w-[400px] h-full flex flex-col flex-1 justify-start">
                {postDetailData ? (
                  <>
                    <div className="flex flex-row justify-between px-2 py-2 border-b">
                      <div className="flex flex-row items-center gap-2 w-full">
                        <ImageWithFallback
                          src={postDetailData.post.postUser.profileImage.url}
                          alt="Profile Image"
                          className="w-10 h-10 rounded-full bg-gray-500"
                        />
                        <div className="flex flex-row justify-between items-center w-full">
                          <UserNameDisplay
                            id={postDetailData.post.postUser.id}
                            className="text-sm"
                            username={postDetailData.post.postUser.username}
                          />
                          <div className="text-sm text-gray-400">
                            {formatPostTime(postDetailData.post.postAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full overflow-y-auto">
                      <div className="px-2 pl-4 py-2">
                        <UserDisplayNameAndContent
                          id={postDetailData.post.postUser.id}
                          userDisplayName={
                            postDetailData.post.postUser.userDisplayName
                          }
                          content={postDetailData.post.caption}
                          userAvatarUrl={
                            postDetailData.post.postUser.profileImage.url
                          }
                        />
                      </div>
                      {/* COMMENTS */}
                      <div className="pl-4 text-xs flex flex-1 flex-col gap-3 py-4 border-t">
                        {postDetailData.comments.map((comment) => (
                          <UserDisplayNameAndContent
                            id={comment.commentUser.id}
                            imageClassName="h-8 w-8"
                            key={comment.id}
                            userDisplayName={
                              comment.commentUser.userDisplayName
                            }
                            content={comment.comment}
                            userAvatarUrl={comment.commentUser.profileImage.url}
                            children={
                              <div className="flex flex-row text-sm">
                                <span className="text-gray-400">
                                  {formatPostTime(comment.commentAt)}
                                </span>
                              </div>
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col px-4">
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
                      <div className="mt-2 font-bold">
                        {postDetailData.post.likeCount} {"likes"}
                      </div>
                      <div>{formatPostTime(postDetailData.post.postAt)}</div>
                    </div>
                    <div className="flex flex-row border-t mt-4">
                      <input
                        className="border-none px-4 py-2 focus:border-none focus:outline-none flex-1"
                        placeholder="Comment..."
                        type="text"
                      />
                      <button className="pl-8 pr-4 py-4">
                        <ShareOutlineIcon className="text-gray-600" />
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default PostDetailModal;
