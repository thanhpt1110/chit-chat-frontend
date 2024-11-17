import { useState } from "react";
import { CameraFillIcon } from "../../../../components/icons/CameraFillIcon";
import { generateExploreData } from "../../../../data/mocks/explore.mock";
import { ExploreItemInListDTO } from "../../../../types/data.type";
import ExploreCard from "../../components/ExploreCard";
import PostDetailModal from "../../components/PostDetailModal";

const USER_POST_DATA: ExploreItemInListDTO[] = generateExploreData(20);

function PostTab() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center">
        {USER_POST_DATA.length === 0 && (
          <>
            <div className="border mt-16 border-gray-600 w-max h-max px-4 py-4 rounded-full">
              <CameraFillIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div className="font-bold text-xl text-center mt-4">
              {"Post your first photo or video"}
            </div>
            <div className="text-gray-500 text-center mt-2">
              {"Share your photos and they will appear on your profile."}
            </div>
            <button className="font-semibold text-blue-400 mt-16">
              {"Share your first image"}
            </button>
          </>
        )}
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-2">
          {USER_POST_DATA.map((item) => (
            <button
              className="overflow-hidden w-56 h-56"
              key={item.postId}
              onClick={() => {
                setSelectedPostId(item.postId);
              }}
            >
              <ExploreCard {...item} />
            </button>
          ))}
          <PostDetailModal
            postId={selectedPostId}
            onClose={() => {
              setSelectedPostId(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostTab;
