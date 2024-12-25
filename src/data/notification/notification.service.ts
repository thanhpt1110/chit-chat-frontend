import { NotificationDTO } from "../../types/data.type";
import { GetNotificationRES } from "./notification.res";

export const getNotificationDTO = (
  data: GetNotificationRES
): NotificationDTO => {
  return {
    id: data.id,
    notificationContent: data.content,
    notificationAt: data.createdOn,
    notificationType: data.action,
    isRead: false,
    userNoti: {
      id: data.lastInteractorUser.id,
      username: data.lastInteractorUser.displayName,
      userDisplayName: data.lastInteractorUser.displayName,
      profileImage: {
        url: data.lastInteractorUser.avatarUrl,
        key: data.lastInteractorUser.avatarUrl,
      },
    },
  };
};
