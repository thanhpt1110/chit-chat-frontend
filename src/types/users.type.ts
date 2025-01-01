export type UserInfo = {
  userId: string;
  displayName: string;
  username: string;
  avatarUrl: string;
};

export type UserRES = {
  id: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
};

export type RecommendUserRES = {
  id: string;
  userId: string;
  user: {
    id: string;
    displayName: string;
    avatarUrl: string;
  };
};
