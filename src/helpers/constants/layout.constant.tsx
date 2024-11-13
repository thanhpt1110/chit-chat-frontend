import { SIDEBAR_TITLE } from "../../types/side-bar.type";

export type SideBarLayoutItem = {
  title: SIDEBAR_TITLE;
  icon: React.ReactNode;
};

export const SIDEBAR_LAYOUT: SideBarLayoutItem[] = [
  {
    title: SIDEBAR_TITLE.HOME,
    icon: <span>🏠</span>,
  },
  {
    title: SIDEBAR_TITLE.SEARCH,
    icon: <span>🔍</span>,
  },
  {
    title: SIDEBAR_TITLE.EXPLORE,
    icon: <span>🔭</span>,
  },
  {
    title: SIDEBAR_TITLE.NOTIFICATIONS,
    icon: <span>🔔</span>,
  },
  {
    title: SIDEBAR_TITLE.MESSAGES,
    icon: <span>💬</span>,
  },
  {
    title: SIDEBAR_TITLE.PROFILE,
    icon: <span>👤</span>,
  },
];
