import { twMerge } from "tailwind-merge";
import { XIcon } from "../../../components/icons/XIcon";

type CallingPopUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  className?: string;
};

export function CallingPopUpModal({
  isOpen,
  onClose,
  content,
  className,
}: CallingPopUpModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-80 bg-black flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="h-full w-full relative flex items-center justify-center">
        <div
          className={twMerge("h-[760px] w-full mx-24 relative", className)}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
        <button
          className="absolute text-xl top-8 right-8 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <XIcon className="text-white h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
