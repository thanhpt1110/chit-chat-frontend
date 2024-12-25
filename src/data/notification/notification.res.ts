import { NOTIFICATION_TYPE } from "../../types/data.type";
import { CommentRES, GetListPostRES } from "../post/post.response";

type LastInteractorUserRES = {
  id: string;
  displayName: string;
  avatarUrl: string;
};

export type GetNotificationRES = {
  id: string;
  content: string;
  type: NOTIFICATION_TYPE;
  reference: string;
  action: NOTIFICATION_TYPE;
  receiverUserId: string;
  post: GetListPostRES;
  comment: CommentRES;
  lastInteractorUser: LastInteractorUserRES;
  createdOn: number;
  updatedOn: number;
};
