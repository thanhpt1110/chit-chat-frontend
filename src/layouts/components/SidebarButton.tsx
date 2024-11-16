import { twMerge } from "tailwind-merge";

type SidebarButtonProps = {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  isExpanded: boolean;
  isActive: boolean;
  activeIcon: React.ReactNode;
};

function SidebarButton({
  icon,
  title,
  onClick,
  isExpanded,
  isActive = false,
  activeIcon,
}: SidebarButtonProps) {
  return (
    <div className="w-full px-2">
      <button
        onClick={onClick}
        className={twMerge(
          "w-full px-6 py-4 flex flex-row items-center justify-start gap-1 overflow-hidden hover:bg-gray-100 rounded-lg",
          isActive && "bg-gray-100"
        )}
      >
        {isActive ? activeIcon : icon}
        <span
          className={twMerge(
            "ml-4 font-normal text-base",
            !isExpanded && "hidden",
            isActive && "font-bold"
          )}
        >
          {title}
        </span>
      </button>
    </div>
  );
}

export default SidebarButton;
