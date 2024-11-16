export type BaseResponse<T> = {
  succeed: boolean;
  result: T;
  errors: [];
};

export type PostDTO = {
  id: number;
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
  id: number;
  username: string;
  profileImage: ImageDTO;
};
