import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { logoutThunk } from "../../data/auth/auth.thunk";
import {
  GlobalState,
  setAddPostModalOpen,
  setSideBarExpandedContent,
} from "../../data/global/global.slice";
import { SIDEBAR_LAYOUT } from "../../helpers/constants/layout.constant";
import { APP_ROUTE } from "../../helpers/constants/route.constant";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useBreakpoint } from "../../hooks/useBreakPoint";
import {
  EXPANDED_CONTENT_TYPE,
  SIDEBAR_TITLE,
} from "../../types/side-bar.type";
import SidebarButton from "./SidebarButton";

function SideBar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activedIndex, setActivedIndex] = useState<number>(0);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const handleSideBarItemSelect = useCallback(
    (index: number, title: SIDEBAR_TITLE) => {
      dispatch(setSideBarExpandedContent(null));
      switch (title) {
        case SIDEBAR_TITLE.HOME:
          setActivedIndex(index);
          setIsExpanded(true);
          navigate(APP_ROUTE.MAIN.HOME);
          break;
        case SIDEBAR_TITLE.SEARCH:
          setActivedIndex(index);
          setIsExpanded(false);
          dispatch(setSideBarExpandedContent(EXPANDED_CONTENT_TYPE.SEARCH));
          break;
        case SIDEBAR_TITLE.EXPLORE:
          setActivedIndex(index);
          setIsExpanded(true);
          navigate(APP_ROUTE.MAIN.EXPLORE);
          break;
        case SIDEBAR_TITLE.NOTIFICATIONS:
          setActivedIndex(index);
          setIsExpanded(false);
          dispatch(
            setSideBarExpandedContent(EXPANDED_CONTENT_TYPE.NOTIFICATIONS)
          );
          break;
        case SIDEBAR_TITLE.MESSAGES:
          setActivedIndex(index);
          setIsExpanded(false);
          dispatch(setSideBarExpandedContent(EXPANDED_CONTENT_TYPE.MESSAGES));
          navigate(APP_ROUTE.MAIN.MESSAGES);
          break;
        case SIDEBAR_TITLE.PROFILE:
          setActivedIndex(index);
          setIsExpanded(true);
          dispatch(setSideBarExpandedContent(EXPANDED_CONTENT_TYPE.PROFILE));
          navigate(APP_ROUTE.MAIN.PROFILE(userInfo.userId));
          break;
        case SIDEBAR_TITLE.CREATE_POST:
          dispatch(setAddPostModalOpen(true));
          break;
        default:
          break;
      }
    },
    [dispatch, navigate, userInfo.userId]
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  const { isSm: isSmallLargerThanSm } = useBreakpoint("sm");

  const isExpandedResponsive = useMemo(
    () => (isSmallLargerThanSm ? isExpanded : false),
    [isExpanded, isSmallLargerThanSm]
  );

  return (
    <>
      <div
        className={twMerge(
          "border h-full flex flex-col justify-between border-gray-200 bg-white transition-all",
          isExpandedResponsive ? "w-80" : "w-24"
        )}
      >
        <div>
          <div className="w-full py-4 flex flex-row items-center justify-center">
            {isExpandedResponsive ? (
              <img className="w-48" src="/ChitChatLong.svg" />
            ) : (
              <img className="w-16" src="/ChitChat.svg" />
            )}
          </div>

          {SIDEBAR_LAYOUT.map((item, index) => (
            <SidebarButton
              activeIcon={item.activeIcon}
              isActive={activedIndex === index}
              isExpanded={isExpandedResponsive}
              key={item.title}
              icon={item.icon}
              title={item.title}
              onClick={() => handleSideBarItemSelect(index, item.title)}
            />
          ))}
        </div>
        <div className="border-t-gray-300 border-t-[1px] w-full">
          <button
            onClick={handleLogout}
            className="w-full h-full flex flex-row py-4 px-4 font-semibold text-gray-400 bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
