import { useEffect, useRef, useState } from "react";
import { useGetExploreListQuery } from "../../../data/explore/explore.api";
import { GetListExploreREQ } from "../../../data/explore/explore.request";
import { ExploreItemInListDTO } from "../../../types/data.type";
import ExploreCard from "../components/ExploreCard";
import PostDetailModal from "../components/PostDetailModal";

export const GET_EXPLORE_LIST_PAGE_SIZE = 9;

function ExplorePage() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [exploreDataPagination, setExploreDataPagination] = useState<
    ExploreItemInListDTO[]
  >([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const getExploreREQ: GetListExploreREQ = {
    SearchText: "",
    IsTag: false,
    PageIndex: currentPageIndex,
    PageSize: GET_EXPLORE_LIST_PAGE_SIZE,
  };

  const {
    data: exploreData,
    isLoading: isExploreDataLoading,
    isFetching: isExploreDataFetching,
  } = useGetExploreListQuery(getExploreREQ);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isExploreDataFetching &&
          !isExploreDataLoading &&
          exploreData?.data.length === GET_EXPLORE_LIST_PAGE_SIZE
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
  }, [isExploreDataLoading, isExploreDataFetching, exploreData?.data.length]);

  useEffect(() => {
    if (exploreData) {
      setExploreDataPagination((prev) => {
        const existingIds = new Set(prev.map((post) => post.postId));
        const newPosts = exploreData.data.filter(
          (post) => !existingIds.has(post.postId)
        );
        return [...prev, ...newPosts];
      });
    }
  }, [exploreData]);

  return (
    <div
      ref={scrollableRef}
      className="flex h-full w-full overflow-auto justify-between items-center flex-col"
    >
      <PostDetailModal
        postId={selectedPostId}
        onClose={() => {
          setSelectedPostId(null);
        }}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 mt-16 gap-2 w-max">
        {exploreDataPagination &&
          exploreDataPagination.map((item, index) => (
            <button
              key={item.postId + "-" + index}
              className="overflow-hidden"
              onClick={() => {
                setSelectedPostId(item.postId);
              }}
            >
              <ExploreCard key={item.postId + "-" + index} {...item} />
            </button>
          ))}
      </div>
      <div ref={bottomRef} className="h-64 flex flex-1 w-full" />
    </div>
  );
}

export default ExplorePage;
