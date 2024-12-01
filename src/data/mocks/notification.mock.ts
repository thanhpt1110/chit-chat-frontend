import { NOTIFICATION_TYPE, NotificationDTO } from "../../types/data.type";

export const notificationMocks: NotificationDTO[] = [
  {
    id: "1",
    notificationAt: 1732428569000,
    notificationType: NOTIFICATION_TYPE.LIKE_POST,
    userNoti: {
      id: "1",
      username: "user1",
      userDisplayName: "User 1",
      profileImage: {
        key: "1",
        url: "https://avatar.iran.liara.run/public",
      },
    },
    notificationContent: "Post Caption",
    isRead: false,
  },
  {
    id: "2",
    notificationAt: 1732428569000,
    notificationType: NOTIFICATION_TYPE.LIKE_COMMENT,
    userNoti: {
      id: "2",
      username: "user2",
      userDisplayName: "User 2",
      profileImage: {
        key: "2",
        url: "https://avatar.iran.liara.run/public",
      },
    },
    notificationContent: "Comment Content",
    isRead: false,
  },
  {
    id: "3",
    notificationAt: 1732428569000,
    notificationType: NOTIFICATION_TYPE.FOLLOWING,
    userNoti: {
      id: "3",
      username: "user3",
      userDisplayName: "User 3",
      profileImage: {
        key: "3",
        url: "https://avatar.iran.liara.run/public",
      },
    },
    notificationContent: "",
    isRead: false,
  },
];
