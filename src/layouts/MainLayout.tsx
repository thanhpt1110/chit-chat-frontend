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
  return (
    <div className="flex flex-row flex-start h-full">
      <div
        className={`relative transition-all ${
          sideBarExpandedContent === EXPANDED_CONTENT_TYPE.MESSAGES
            ? "w-24"
            : "w-[500px]"
        }`}
      >
        <SideBar />
        <SideBarExpandedContent />
      </div>
      <div className="w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
