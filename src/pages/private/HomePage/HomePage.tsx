import { useState } from "react";
import { twMerge } from "tailwind-merge";
import PostCard from "../../../components/PostCard";
import UserSummarySuggestCard, {
  UserSuggestData,
} from "../../../components/UserSummarySuggestCard";
import { GlobalState } from "../../../data/global/global.slice";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useBreakpoint } from "../../../hooks/useBreakPoint";
import { PostDTO } from "../../../types/data.type";
import PostDetailModal from "../components/PostDetailModal";

const POST_DATA: PostDTO[] = [
  {
    id: "1",
    postAt: 1700141450000,
    postUser: {
      id: "1",
      username: "user1",
      profileImage: {
        key: "key1",
        url: "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg",
      },
      userDisplayName: "User Display Name",
    },
    postImages: [
      {
        key: "key1",
        url: "https://i.pinimg.com/736x/d4/ec/de/d4ecde0d5df25113423d19bae55084d5.jpg",
      },
      {
        key: "key2",
        url: "https://i.pinimg.com/736x/1f/3d/b6/1f3db6c18ee4b98f9415a1d54e065bc6.jpg",
      },
      {
        key: "key3",
        url: "https://i.pinimg.com/736x/88/23/0b/88230bee7b2351e65a7bb98fa12b7485.jpg",
      },
    ],
    likeCount: 10,
    caption: "Caption 1",
  },
  {
    id: "2",
    postAt: 1700141180000,
    postUser: {
      id: "1",
      username: "user2",
      profileImage: {
        key: "key1",
        url: "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4394.jpg",
      },
      userDisplayName: "User Display Name",
    },
    postImages: [
      {
        key: "key2",
        url: "url2",
      },
    ],
    likeCount: 20,
    caption: "Caption 2",
  },
  {
    id: "3",
    postAt: 1700141180000,
    postUser: {
      id: "1",
      username: "user3",
      profileImage: {
        key: "key1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR55VBH6gLT6OUX61AF0AK4BPGagMYbGI7TKTOOx3Y0z8w_Vxx6QKS97uY1_yhw3cwfGg4&usqp=CAU",
      },
      userDisplayName: "User Display Name",
    },
    postImages: [
      {
        key: "key3",
        url: "url3",
      },
    ],
    likeCount: 30,
    caption: "Caption 3",
  },
];

const NEW_PEOPLE_SUGGESTED_DATA: UserSuggestData[] = [
  {
    avatarUrl: "https://i.pinimg.com",
    username: "user1",
    summarySuggestContent: "Suggest 1",
  },
  {
    avatarUrl: "https://i.pinimg.com",
    username: "user2",
    summarySuggestContent: "Suggest 2",
  },
  {
    avatarUrl: "https://i.pinimg.com",
    username: "user3",
    summarySuggestContent: "Suggest 3",
  },
  {
    avatarUrl: "https://i.pinimg.com",
    username: "user4",
    summarySuggestContent: "Suggest 4",
  },
  {
    avatarUrl: "https://i.pinimg.com",
    username: "user5",
    summarySuggestContent: "Suggest 5",
  },
];

function HomePage() {
  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const { isLg: isScreenLargerThanLg } = useBreakpoint("lg");

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-row mt-5">
      <div className="flex flex-col gap-8 items-center flex-1 mt-4">
        {POST_DATA.map((postData) => (
          <PostCard
            onCommentClick={() => {
              setSelectedPostId(postData.id);
            }}
            key={postData.id}
            postData={postData}
          />
        ))}
      </div>

      {/* Profile Button - Suggest Friend */}
      <div
        className={twMerge(
          "flex flex-col pl-16 xl:pr-72",
          !isScreenLargerThanLg && "hidden"
        )}
      >
        <UserSummarySuggestCard
          avatarUrl={userInfo.avatarUrl}
          username={userInfo.username}
          summarySuggestContent={userInfo.displayName}
          actionLabel={"Switch"}
          onActionClick={() => {}}
        />
        {/* Suggestion  */}
        <div className="flex flex-row mt-8 w-full items-center justify-between">
          <div className="text-sm font-medium text-gray-500">
            {"Suggestion for you"}
          </div>
          <button className="text-sm font-medium text-gray-900">
            {"View alls"}
          </button>
        </div>
        {NEW_PEOPLE_SUGGESTED_DATA.map((userSuggestData) => (
          <UserSummarySuggestCard
            key={userSuggestData.username}
            actionLabel={"Follow"}
            onActionClick={() => {}}
            {...userSuggestData}
          />
        ))}
        <PostDetailModal
          postId={selectedPostId}
          onClose={() => {
            setSelectedPostId(null);
          }}
        />
      </div>
    </div>
  );
}

export default HomePage;
