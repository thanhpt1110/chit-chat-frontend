import ImageWithFallback from "../../../components/ImageWithFallback";
import { ExploreItemInListDTO } from "../../../types/data.type";

type ExploreCardProps = {} & ExploreItemInListDTO;

function ExploreCard({
  postId,
  postImage,
  likeCount,
  commentCount,
}: ExploreCardProps) {
  return (
    <div className="bg-black max-h-80 max-w-80 relative group">
      {/* Background */}
      <ImageWithFallback
        src={postImage.url}
        alt="Post"
        className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
      />

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
          <div className="flex flex-row gap-8">
            <div className="text-lg font-bold">{likeCount} ❤️</div>
            <div className="text-lg font-bold">{commentCount} 💬</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreCard;
