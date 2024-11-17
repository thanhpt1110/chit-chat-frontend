export type BaseResponse<T> = {
  succeed: boolean;
  result: T;
  errors: [];
};

export type PostDTO = {
  id: string;
  postAt: number;
  postUser: UserDTO;
  postImages: ImageDTO[];
  likeCount: number;
  caption: string;
};

export type ImageDTO = {
  key: string;
  url: string;
};

export type UserDTO = {
  id: string;
  username: string;
  userDisplayName: string;
  profileImage: ImageDTO;
};

export type MessageDTO = {
  messageId: string;
  content: string;
  time: number;
};

export type ConversationDTO = {
  senderId: string;
  message: MessageDTO;
};

export type ExploreItemInListDTO = {
  postId: string;
  postImage: ImageDTO;
  likeCount: number;
  commentCount: number;
};

export type CommentDTO = {
  id: string;
  commentAt: number;
  commentUser: UserDTO;
  comment: string;
};

export type PostDetailDTO = {
  post: PostDTO;
  comments: CommentDTO[];
};
