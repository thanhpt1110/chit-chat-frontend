import { twMerge } from "tailwind-merge";
import { RootState } from "../../data";
import { GlobalState } from "../../data/global/global.slice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { EXPANDED_CONTENT_TYPE } from "../../types/side-bar.type";

function SideBarExpandedContent() {
  const { sideBarExpandedContent }: GlobalState = useAppSelector(
    (state: RootState) => state.global
  );
  return (
    <div
      className={twMerge(
        "w-96 border px-4 py-6 bg-white h-full absolute z-[10000] shadow-lg rounded-e-2xl",
        !sideBarExpandedContent && "hidden"
      )}
    >
      {sideBarExpandedContent === EXPANDED_CONTENT_TYPE.SEARCH && (
        <div>Search</div>
      )}
      {sideBarExpandedContent === EXPANDED_CONTENT_TYPE.NOTIFICATIONS && (
        <div>Notifications</div>
      )}
    </div>
  );
}

export default SideBarExpandedContent;
