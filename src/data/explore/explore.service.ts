import { ExploreItemInListDTO } from "../../types/data.type";
import { GetListPostRES } from "../post/post.response";

export const getExploreItemInListDTO = (
  data: GetListPostRES
): ExploreItemInListDTO => ({
  postId: data.id,
  postImage: {
    key: data.postMedias[0].id,
    url: data.postMedias[0].mediaUrl,
  },
  likeCount: data.reactionCount,
  commentCount: data.commentCount,
});
