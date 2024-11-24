import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Show from "../../../components/condition/Show";
import PostCard from "../../../components/PostCard";
import UserSummarySuggestCard, {
  UserSuggestData,
} from "../../../components/UserSummarySuggestCard";
import { GlobalState } from "../../../data/global/global.slice";
import { useGetPostsQuery } from "../../../data/post/post.api";
import { GetListPostREQ } from "../../../data/post/post.request";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useBreakpoint } from "../../../hooks/useBreakPoint";
import PostDetailModal from "../components/PostDetailModal";

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

  const getHomePostsREQ: GetListPostREQ = {
    PageIndex: 0,
    PageSize: 10,
  };
  const {
    data: postData,
    isLoading: isPostDataLoading,
    isFetching: isPostDataFetching,
  } = useGetPostsQuery(getHomePostsREQ);

  useEffect(() => {
    console.log("postData", postData);
  }, [postData]);

  return (
    <div className="flex-1 flex flex-row mt-5">
      <div className="flex flex-col gap-8 items-center flex-1 mt-4">
        <Show when={!isPostDataFetching && !isPostDataLoading}>
          {postData &&
            postData.map((postData) => (
              <PostCard
                onCommentClick={() => {
                  setSelectedPostId(postData.id);
                }}
                key={postData.id}
                postData={postData}
              />
            ))}
        </Show>
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
