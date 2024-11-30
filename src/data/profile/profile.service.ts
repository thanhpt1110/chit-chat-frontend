import { ProfileDetailDTO } from "../../types/data.type";
import { GetProfileDetailRES, GetProfileSearchRES } from "./profile.response";

export type ProfileSearchDTO = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
};

export const getProfileSearchDTO = (
  data: GetProfileSearchRES
): ProfileSearchDTO => ({
  id: data.id,
  username: data.displayName || "",
  displayName: data.displayName || "",
  avatarUrl: data.avatarUrl || "",
  bio: data.bio || "",
});

export const getProfileDetailDTO = (
  data: GetProfileDetailRES
): ProfileDetailDTO => ({
  id: data.id,
  username: data.displayName,
  userDisplayName: data.displayName,
  profileImage: {
    key: data.avatarUrl,
    url: data.avatarUrl,
  },
  bio: data.bio,
  postCount: 0,
  followerCount: 0,
  followingCount: 0,
});