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
import { formatPostTime } from "../../../helpers/format/date-time.format";
import { PostDetailDTO } from "../../../types/data.type";

type PostDetailModalProps = {
  postId: string | null;
  onClose: () => void;
};

function PostDetailModal({ postId, onClose }: PostDetailModalProps) {
  const postDetailData: PostDetailDTO = {
    post: {
      id: "1",
      postAt: Date.now(),
      postUser: {
        id: "1",
        username: "username",
        profileImage: {
          key: "1",
          url: "https://i.pinimg.com/736x/b9/88/df/b988dfe9a1d31d32cad9b7aaa36c479c.jpg",
        },
        userDisplayName: "User Display Name",
      },
      postImages: [
        {
          key: "1",
          url: "https://i.pinimg.com/736x/38/16/a9/3816a930470cb0e7d784f29421fc93b4.jpg",
        },
        {
          key: "2",
          url: "https://i.pinimg.com/736x/e0/bc/52/e0bc52cd9c0e6f4e089133cd8bf08bb1.jpg",
        },
        {
          key: "3",
          url: "https://i.pinimg.com/736x/ae/97/c1/ae97c112f9ecb8101083a6e6561a7745.jpg",
        },
      ],
      likeCount: 0,
      caption:
        "Hi guys💕 Here’s our web design for ORION – an advanced job platform designed to connect talented professionals with top-tier employers across industries. This software provides a seamless experience for both job seekers and hiring managers, ensuring the right matches are made👨‍💻 👉 If you would like to hire us - you can send your Request 👍 at hello@rondesignlab.com #webdesign #web #ui #ux #uidesign #uxdesign #dribbble #digitalagency #uiux #userexperience #userinterface #appdesign #interface #designagency #uxdesigner #uidesigner #dashboard #webagency #mobileapp #mobileappdesign #interfacedesign #appdesigner #smartapp #softwaredesign #businessapp #adminpanel #dashboarddesign #admindashboard",
    },
    comments: [
      {
        id: "1",
        commentAt: Date.now(),
        commentUser: {
          id: "1",
          username: "username",
          profileImage: {
            key: "1",
            url: "https://i.pinimg.com/736x/38/16/a9/3816a930470cb0e7d784f29421fc93b4.jpg",
          },
          userDisplayName: "usercomment1",
        },
        comment:
          "I love how this design anticipates user needs before they even know them!",
      },
      {
        id: "2",
        commentAt: Date.now(),
        commentUser: {
          id: "2",
          username: "username",
          profileImage: {
            key: "2",
            url: "https://i.pinimg.com/736x/ee/d5/c2/eed5c2263a92d6134ead28e10b863cbe.jpg",
          },
          userDisplayName: "usercomment2",
        },
        comment:
          "CoSuch a refreshing web design! It’s clear that user experience was a top priority. Great jobmment",
      },
    ],
  };

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleToggleLike = useCallback(() => {}, []);

  const handleToggleSave = useCallback(() => {}, []);

  return (
    <div className="">
      {/* Modal */}
      <Modal
        className="h-[600px]  w-max border"
        isOpen={!!postId}
        onClose={onClose}
        content={
          <div className="flex flex-row h-full justify-between">
            <button
              onDoubleClick={() => {
                setIsLiked((prev) => !prev);
                handleToggleLike();
              }}
            >
              <ImageSlider
                className="max-w-[600px] max-h-full items-center self-center"
                images={postDetailData.post.postImages.map(
                  (image) => image.url
                )}
              />
            </button>
            <div className="bg-white w-[400px] h-full flex flex-col flex-1 justify-between">
              <div className="flex flex-row justify-between px-2 py-2 border-b">
                <div className="flex flex-row items-center gap-2">
                  <ImageWithFallback
                    src={postDetailData.post.postUser.profileImage.url}
                    alt="Profile Image"
                    className="w-10 h-10 rounded-full bg-gray-500"
                  />
                  <div className="flex flex-col justify-center">
                    <UserNameDisplay
                      className="text-base"
                      username={postDetailData.post.postUser.username}
                    />
                    <div>{formatPostTime(postDetailData.post.postAt)}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-y-scroll">
                <div className="px-2 py-2">
                  <UserDisplayNameAndContent
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
                <div className="pl-4 text-xs flex flex-col gap-3 py-4 border-t">
                  {postDetailData.comments.map((comment) => (
                    <UserDisplayNameAndContent
                      imageClassName="h-8 w-8"
                      key={comment.id}
                      userDisplayName={comment.commentUser.userDisplayName}
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
            </div>
          </div>
        }
      />
    </div>
  );
}

export default PostDetailModal;
