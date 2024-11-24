import { PostDTO } from "../../types/data.type";
import { GetListPostRES } from "./post.response";

export const getPostDTO = (data: GetListPostRES): PostDTO => ({
  id: data.id,
  postAt: new Date().getTime(),
  postUser: {
    id: "1",
    username: "username",
    profileImage: {
      key: "key1",
      url: "https://avatar",
    },
    userDisplayName: "User Display Name",
  },
  postImages: data.postMedias.map((media) => ({
    key: media.id,
    url: media.mediaUrl,
  })),
  likeCount: data.reactionCount,
  caption: data.description,
  comment: data.comments.map((comment) => {
    return {
      id: comment.id,
      commentAt: new Date().getTime(),
      commentUser: {
        id: "1",
        username: "username",
        profileImage: {
          key: "key1",
          url: "https://avatar",
        },
        userDisplayName: "User Display Name",
      },
      comment: comment.content,
    };
  }),
});
