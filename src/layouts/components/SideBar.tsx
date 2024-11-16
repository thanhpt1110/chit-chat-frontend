import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { logoutThunk } from "../../data/auth/auth.thunk";
import { setSideBarExpandedContent } from "../../data/global/global.slice";
import { SIDEBAR_LAYOUT } from "../../helpers/constants/layout.constant";
import { APP_ROUTE } from "../../helpers/constants/route.constant";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  EXPANDED_CONTENT_TYPE,
  SIDEBAR_TITLE,
} from "../../types/side-bar.type";
import SidebarButton from "./SidebarButton";

function SideBar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activedIndex, setActivedIndex] = useState<number>(0);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSideBarItemSelect = useCallback(
    (index: number, title: SIDEBAR_TITLE) => {
      setActivedIndex(index);
      dispatch(setSideBarExpandedContent(null));
      switch (title) {
        case SIDEBAR_TITLE.HOME:
          setIsExpanded(true);
          navigate(APP_ROUTE.MAIN.HOME);
          break;
        case SIDEBAR_TITLE.SEARCH:
          dispatch(setSideBarExpandedContent(EXPANDED_CONTENT_TYPE.SEARCH));
          setIsExpanded(false);
          break;
        case SIDEBAR_TITLE.EXPLORE:
          navigate(APP_ROUTE.MAIN.EXPLORE);
          break;
        case SIDEBAR_TITLE.NOTIFICATIONS:
          dispatch(
            setSideBarExpandedContent(EXPANDED_CONTENT_TYPE.NOTIFICATIONS)
          );
          setIsExpanded(false);
          break;
        case SIDEBAR_TITLE.MESSAGES:
          navigate(APP_ROUTE.MAIN.MESSAGES);
          break;
        case SIDEBAR_TITLE.PROFILE:
          navigate(APP_ROUTE.MAIN.PROFILE);
          break;
        default:
          break;
      }
    },
    [dispatch, navigate]
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return (
    <div
      className={twMerge(
        "border h-full flex flex-col justify-between border-gray-200",
        isExpanded ? "w-80" : "w-24"
      )}
    >
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-4 flex flex-row items-center justify-center overflow-hidden"
        >
          {isExpanded ? (
            <img className="w-48" src="/ChitChatLong.svg" />
          ) : (
            <img className="w-12" src="/ChitChat.svg" />
          )}
        </button>

        {SIDEBAR_LAYOUT.map((item, index) => (
          <SidebarButton
            activeIcon={item.activeIcon}
            isActive={activedIndex === index}
            isExpanded={isExpanded}
            key={index}
            icon={item.icon}
            title={item.title}
            onClick={() => handleSideBarItemSelect(index, item.title)}
          />
        ))}
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="w-full h-12 flex flex-row items-center justify-center overflow-hidden"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
