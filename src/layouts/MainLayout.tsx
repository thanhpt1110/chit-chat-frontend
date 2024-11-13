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
      <Outlet />
    </div>
  );
}

export default MainLayout;
