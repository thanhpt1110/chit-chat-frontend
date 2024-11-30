export type GetProfileSearchRES = {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  phoneNumber: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  gender: string | null;
};

export type GetProfileDetailRES = {
  id: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  bio: string;
  dateOfBith: string;
  gender: string;
};
