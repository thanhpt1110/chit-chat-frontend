import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import SideBarExpandedContent from "./components/SideBarExpandedContent";
import { GlobalState } from "../data/global/global.slice";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../data";
import { EXPANDED_CONTENT_TYPE } from "../types/side-bar.type";

function MainLayout() {
  const { sideBarExpandedContent }: GlobalState = useAppSelector(
    (state: RootState) => state.global
  );
  const isHidden = sideBarExpandedContent === EXPANDED_CONTENT_TYPE.MESSAGES;

  return (
    <div className="flex flex-row flex-start h-full">
      <div className="w-24">
        <SideBar />
        <SideBarExpandedContent />
      </div>
      <div className={`w-full overflow-auto ${isHidden ? "ml-44" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
