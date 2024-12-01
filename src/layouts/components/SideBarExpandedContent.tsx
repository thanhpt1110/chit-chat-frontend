import { twMerge } from "tailwind-merge";
import { RootState } from "../../data";
import { GlobalState } from "../../data/global/global.slice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { EXPANDED_CONTENT_TYPE } from "../../types/side-bar.type";
import NotificationBar from "./NotificationBar";
import SearchBar from "./SearchBar";

function SideBarExpandedContent() {
  const { sideBarExpandedContent }: GlobalState = useAppSelector(
    (state: RootState) => state.global
  );

  const isHidden =
    !sideBarExpandedContent ||
    sideBarExpandedContent === EXPANDED_CONTENT_TYPE.MESSAGES ||
    sideBarExpandedContent === EXPANDED_CONTENT_TYPE.PROFILE;

  return (
    <div
      className={twMerge(
        "absolute top-0 left-[96px] w-96 border px-4 py-6 bg-white h-full z-[50] shadow-lg rounded-e-2xl",
        isHidden && "hidden"
      )}
    >
      {sideBarExpandedContent === EXPANDED_CONTENT_TYPE.SEARCH && (
        <div className="flex flex-col w-full">
          <div className="text-xl font-bold">Search</div>
          <SearchBar />
        </div>
      )}
      {sideBarExpandedContent === EXPANDED_CONTENT_TYPE.NOTIFICATIONS && (
        <div className="flex flex-col w-full">
          <div className="text-xl font-bold">Notifications</div>
          <NotificationBar />
        </div>
      )}
    </div>
  );
}

export default SideBarExpandedContent;
