import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import PostCard from "../../../components/PostCard";
import UserSummarySuggestCard, {
  UserSuggestData,
} from "../../../components/UserSummarySuggestCard";
import { GlobalState } from "../../../data/global/global.slice";
import { useGetPostsQuery } from "../../../data/post/post.api";
import { GetListPostREQ } from "../../../data/post/post.request";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useBreakpoint } from "../../../hooks/useBreakPoint";
import { PostDTO } from "../../../types/data.type";
import PostDetailModal from "../components/PostDetailModal";

const NEW_PEOPLE_SUGGESTED_DATA: UserSuggestData[] = [
  {
    id: "1",
    avatarUrl: "https://i.pinimg.com",
    username: "user1",
    summarySuggestContent: "Suggest 1",
  },
  {
    id: "2",
    avatarUrl: "https://i.pinimg.com",
    username: "user2",
    summarySuggestContent: "Suggest 2",
  },
  {
    id: "3",
    avatarUrl: "https://i.pinimg.com",
    username: "user3",
    summarySuggestContent: "Suggest 3",
  },
  {
    id: "4",
    avatarUrl: "https://i.pinimg.com",
    username: "user4",
    summarySuggestContent: "Suggest 4",
  },
  {
    id: "5",
    avatarUrl: "https://i.pinimg.com",
    username: "user5",
    summarySuggestContent: "Suggest 5",
  },
];

export const GET_POST_HOME_PAGE_SIZE = 3;

function HomePage() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { userInfo }: GlobalState = useAppSelector((state) => state.global);
  const { isLg: isScreenLargerThanLg } = useBreakpoint("lg");

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [postDataPagination, setPostDataPagination] = useState<PostDTO[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const getHomePostsREQ: GetListPostREQ = {
    PageIndex: currentPageIndex,
    PageSize: GET_POST_HOME_PAGE_SIZE,
  };
  const {
    data: postData,
    isLoading: isPostDataLoading,
    isFetching: isPostDataFetching,
  } = useGetPostsQuery(getHomePostsREQ);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isPostDataFetching &&
          !isPostDataLoading &&
          postData?.data.length === GET_POST_HOME_PAGE_SIZE
        ) {
          console.log("Load more triggered");
          setCurrentPageIndex((prev) => prev + 1);
        }
      },
      {
        root: scrollableRef.current,
        threshold: 1,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [isPostDataFetching, isPostDataLoading, postData?.data.length]);

  useEffect(() => {
    if (postData) {
      setPostDataPagination((prev) => {
        const existingIds = new Set(prev.map((post) => post.id));
        const newPosts = postData.data.filter(
          (post) => !existingIds.has(post.id)
        );
        return [...prev, ...newPosts];
      });
    }
  }, [postData]);

  return (
    <div
      ref={scrollableRef}
      className="flex h-full w-full pb-8 overflow-auto justify-between flex-col"
    >
      <div className="flex-1 flex flex-row mt-5">
        <div className="flex overflow-auto flex-col gap-8 items-center flex-1 mt-4">
          {postDataPagination &&
            postDataPagination.map((postData) => (
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
            id={userInfo.userId}
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
      <div ref={bottomRef} className="h-64 flex flex-1 w-full" />
    </div>
  );
}

export default HomePage;
