import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { SIDEBAR_TITLE } from "../../types/side-bar.type";

type SidebarButtonProps = {
  icon: React.ReactNode;
  title: SIDEBAR_TITLE;
  onClick: () => void;
  isExpanded: boolean;
  isActive: boolean;
  activeIcon: React.ReactNode;
};

function SidebarButton({
  icon,
  title,
  onClick,
  isExpanded,
  isActive = false,
  activeIcon,
}: SidebarButtonProps) {
  // Call API Get New Notification Count here
  const newNotifications = useMemo(() => 100, []);

  // Call API Get New Message Count here
  const newMessages = useMemo(() => 5, []);

  const badgeCount = useMemo(() => {
    switch (title) {
      case SIDEBAR_TITLE.NOTIFICATIONS:
        return newNotifications;
      case SIDEBAR_TITLE.MESSAGES:
        return newMessages;
      default:
        return null;
    }
  }, [newMessages, newNotifications, title]);
  return (
    <div className="w-full px-2">
      <button
        onClick={onClick}
        className={twMerge(
          "w-full px-6 py-4 flex flex-row items-center justify-start gap-1 overflow-hidden hover:bg-gray-100 rounded-lg",
          isActive && "bg-gray-100"
        )}
      >
        <div className="relative">
          {isActive ? activeIcon : icon}
          {!isExpanded && (
            <>
              {!isActive && badgeCount && (
                <div className="rounded-full -top-4 -right-4 absolute font-semibold text-[8px] bg-red-500 text-white h-5 w-5 flex flex-row self-center justify-between items-center text-center">
                  <div className="w-full text-center">
                    {badgeCount < 100 ? badgeCount : "99+"}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div
          className={twMerge(
            "ml-4 font-normal text-base flex flex-1 flex-row justify-between",
            !isExpanded && "hidden",
            isActive && "font-bold"
          )}
        >
          {title}
          {badgeCount && (
            <div className="rounded-full font-semibold text-[10px] bg-red-500 text-white h-7 w-7 flex flex-row self-center justify-between items-center text-center">
              <div className="w-full text-center">
                {badgeCount < 100 ? badgeCount : "99+"}
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

export default SidebarButton;
