import { ChatFillIcon } from "../../components/icons/ChatFillIcon";
import { ChatOutlineIcon } from "../../components/icons/ChatOutlineIcon";
import { ExploreFillIcon } from "../../components/icons/ExploreFillIcon";
import { ExploreOutlineIcon } from "../../components/icons/ExploreOutlineIcon";
import { HomeFillIcon } from "../../components/icons/HomeFillIcon";
import { HomeOutlineIcon } from "../../components/icons/HomeOutlineIcon";
import { NotificationFillIcon } from "../../components/icons/NotificationFillIcon";
import { NotificationOutlineIcon } from "../../components/icons/NotificationOutlineIcon";
import { ProfileFillIcon } from "../../components/icons/ProfileFillIcon";
import { ProfileOutlineIcon } from "../../components/icons/ProfileOutlineIcon";
import { SearchFillIcon } from "../../components/icons/SearchFillIcon";
import { SearchOutlineIcon } from "../../components/icons/SearchOutlineIcon";
import { SIDEBAR_TITLE } from "../../types/side-bar.type";

export type SideBarLayoutItem = {
  title: SIDEBAR_TITLE;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
};

export const SIDEBAR_LAYOUT: SideBarLayoutItem[] = [
  {
    title: SIDEBAR_TITLE.HOME,
    icon: <HomeOutlineIcon />,
    activeIcon: <HomeFillIcon />,
  },
  {
    title: SIDEBAR_TITLE.SEARCH,
    icon: <SearchOutlineIcon />,
    activeIcon: <SearchFillIcon />,
  },
  {
    title: SIDEBAR_TITLE.EXPLORE,
    icon: <ExploreOutlineIcon />,
    activeIcon: <ExploreFillIcon />,
  },
  {
    title: SIDEBAR_TITLE.NOTIFICATIONS,
    icon: <NotificationOutlineIcon />,
    activeIcon: <NotificationFillIcon />,
  },
  {
    title: SIDEBAR_TITLE.MESSAGES,
    icon: <ChatOutlineIcon />,
    activeIcon: <ChatFillIcon />,
  },
  {
    title: SIDEBAR_TITLE.PROFILE,
    icon: <ProfileOutlineIcon />,
    activeIcon: <ProfileFillIcon />,
  },
];
