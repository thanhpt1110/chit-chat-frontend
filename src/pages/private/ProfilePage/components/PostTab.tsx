import { useState } from "react";
import { CameraFillIcon } from "../../../../components/icons/CameraFillIcon";
import { PostDTO } from "../../../../types/data.type";
import ExploreCard from "../../components/ExploreCard";
import PostDetailModal from "../../components/PostDetailModal";

type PostTabProps = {
  data?: PostDTO[];
};

function PostTab({ data }: PostTabProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center">
        {data?.length === 0 && (
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
          {data?.map((item) => (
            <button
              className="overflow-hidden w-56 h-56"
              key={item.id}
              onClick={() => {
                setSelectedPostId(item.id);
              }}
            >
              <ExploreCard
                postId={item.id}
                postImage={item.postImages[0]}
                likeCount={item.likeCount}
                commentCount={item.commentCount}
              />
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
