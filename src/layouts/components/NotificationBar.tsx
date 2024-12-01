import ImageWithFallback from "../../components/ImageWithFallback";
import UserNameDisplay from "../../components/UserNameDisplay";
import { notificationMocks } from "../../data/mocks/notification.mock";
import { formatPostTime } from "../../helpers/format/date-time.format";
import { NOTIFICATION_TYPE } from "../../types/data.type";

function NotificationBar() {
  return (
    <div className="mt-2 w-full gap-2 flex flex-col">
      {notificationMocks.map((notification) => (
        <div
          key={notification.id}
          className="w-full flex flex-row justify-between items-center p-1"
        >
          <div className="flex flex-row items-center">
            <ImageWithFallback
              className="rounded-full h-11 w-11"
              alt=""
              src={notification.userNoti.profileImage.url}
            />
            <div className="ml-2">
              <span className="flex flex-row gap-1 text-sm">
                <UserNameDisplay
                  id={notification.userNoti.id}
                  username={notification.userNoti.username}
                />
                {notification.notificationType ===
                  NOTIFICATION_TYPE.LIKE_POST && <>{"liked your post"}</>}
                {notification.notificationType ===
                  NOTIFICATION_TYPE.LIKE_COMMENT && <>{"liked your comment"}</>}
                {notification.notificationType ===
                  NOTIFICATION_TYPE.FOLLOWING && <>{"started following you"}</>}
              </span>
              {(notification.notificationType === NOTIFICATION_TYPE.LIKE_POST ||
                notification.notificationType ===
                  NOTIFICATION_TYPE.LIKE_COMMENT) && (
                <p className="text-sm text-gray-500">
                  "{notification.notificationContent}"
                </p>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {formatPostTime(notification.notificationAt)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationBar;
