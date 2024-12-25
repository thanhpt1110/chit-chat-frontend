import { useEffect, useRef, useState } from "react";
import ImageWithFallback from "../../components/ImageWithFallback";
import UserNameDisplay from "../../components/UserNameDisplay";
import {
  GET_NOTIFICATION_PAGE_SIZE,
  useGetNotificationsQuery,
} from "../../data/notification/notification.api";
import { GetListNotificationREQ } from "../../data/notification/notification.req";
import { formatPostTime } from "../../helpers/format/date-time.format";
import { NOTIFICATION_TYPE, NotificationDTO } from "../../types/data.type";

function NotificationBar() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [notificationDataPagination, setNotificationDataPagination] = useState<
    NotificationDTO[]
  >([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const getExploreREQ: GetListNotificationREQ = {
    PageIndex: currentPageIndex,
    PageSize: GET_NOTIFICATION_PAGE_SIZE,
  };

  const {
    data: notificationData,
    isLoading: isNotificationDataLoading,
    isFetching: isNotificationDataFetching,
  } = useGetNotificationsQuery(getExploreREQ);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isNotificationDataFetching &&
          !isNotificationDataLoading &&
          notificationData?.data.length === GET_NOTIFICATION_PAGE_SIZE
        ) {
          setCurrentPageIndex((prev) => prev + 1);
        }
      },
      {
        root: scrollableRef.current,
        threshold: 1,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [
    isNotificationDataLoading,
    isNotificationDataFetching,
    notificationData?.data.length,
  ]);

  useEffect(() => {
    if (notificationData) {
      setNotificationDataPagination((prev) => {
        const existingIds = new Set(prev.map((noti) => noti.id));
        const newPosts = notificationData.data.filter(
          (noti) => !existingIds.has(noti.id)
        );
        return [...prev, ...newPosts];
      });
    }
  }, [notificationData]);

  return (
    <div className="mt-2 w-full gap-2 flex flex-col">
      {notificationDataPagination.map((notification) => (
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
      {notificationData && notificationData.data.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16">
          <ImageWithFallback
            className="h-24 w-24 opacity-40"
            src="/assets/images/empty-message.svg"
            alt="empty-message"
          />
          <div className="text-center text-gray-500 mx-16 mt-4">
            No notifications found. Try interacting with other people or posts.
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBar;
