import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import SideBarExpandedContent from "./components/SideBarExpandedContent";

function MainLayout() {
  return (
    <div className="flex flex-row flex-start h-full">
      <SideBar />
      <div className="relative">
        <SideBarExpandedContent />
      </div>
      <div className="w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
