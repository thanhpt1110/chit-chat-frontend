import { UserRES } from "../../types/users.type";

export type LoginRES = {
  user: UserRES;
  accessToken: string;
  refreshToken: string;
  loginHistoryid: string;
};
