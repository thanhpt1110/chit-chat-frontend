export type BaseResponse<T> = {
  succeed: boolean;
  result: T;
  errors: [];
};

export type PaginationDTO<T> = {
  data: T[];
} & {
  isLastPage: boolean;
};

export type PaginationREQ = {
  PageIndex: number;
  PageSize: number;
};

export type PostDTO = {
  id: string;
  postAt: number;
  postUser: UserDTO;
  postImages: ImageDTO[];
  likeCount: number;
  caption: string;
  commentCount: number;
  isLiked: boolean;
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
  conversationId: string;
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

export type ProfileDetailDTO = {
  id: string;
  username: string;
  userDisplayName: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  profileImage: ImageDTO;
  bio: string;
  isFollowed: boolean;
};

export enum NOTIFICATION_TYPE {
  LIKE_POST = "LIKE_POST",
  LIKE_COMMENT = "LIKE_COMMENT",
  FOLLOWING = "FOLLOWING",
}

export type NotificationDTO = {
  id: string;
  notificationType: NOTIFICATION_TYPE;
  notificationAt: number;
  userNoti: UserDTO;
  isRead: boolean;
  notificationContent: string;
};

export type ConversationInformationDTO = {
  conversationId: string;
  chatter: UserDTO;
};
