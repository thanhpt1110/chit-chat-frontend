export enum MEDIA_TYPE {
  IMAGE = "Image",
  VIDEO = "Video",
}

export type PostMediaRES = {
  postId: string;
  mediaType: MEDIA_TYPE;
  mediaUrl: string;
  mediaOrder: number;
  description: string;
  id: string;
};

export type CommentRES = {
  id: string;
  isDeleted: boolean;
  createdOn: string;
  content: string;
  reactionCount: number;
};

export type GetListPostRES = {
  id: string;
  postMedias: PostMediaRES[];
  description: string;
  reactionCount: number;
  commentCount: number;
  comments: CommentRES[];
};
