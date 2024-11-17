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
