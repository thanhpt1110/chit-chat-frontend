import { useState } from "react";
import { generateExploreData } from "../../../data/mocks/explore.mock";
import { ExploreItemInListDTO } from "../../../types/data.type";
import ExploreCard from "../components/ExploreCard";
import PostDetailModal from "../components/PostDetailModal";

const EXPLORE_DATA: ExploreItemInListDTO[] = generateExploreData(100);

function ExplorePage() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  return (
    <div className="flex justify-center">
      <PostDetailModal
        postId={selectedPostId}
        onClose={() => {
          setSelectedPostId(null);
        }}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 mt-16 gap-2 w-max">
        {EXPLORE_DATA.map((item) => (
          <button
            key={item.postId}
            className="overflow-hidden"
            onClick={() => {
              setSelectedPostId(item.postId);
            }}
          >
            <ExploreCard {...item} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
