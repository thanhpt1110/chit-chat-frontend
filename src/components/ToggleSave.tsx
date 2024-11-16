import { useEffect, useState } from "react";
import { BookMarkFillIcon } from "./icons/BookMarkFillIcon";
import { BookMarkOutlineIcon } from "./icons/BookMarkOutlineIcon";

type ToggleSaveProps = {
  SaveControlFromParent?: boolean;
  handleToggleSave: () => void;
  SaveIconClassName?: string;
  className?: string;
};

function ToggleSave({
  handleToggleSave,
  SaveControlFromParent,
  SaveIconClassName,
  className,
}: ToggleSaveProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (SaveControlFromParent !== undefined) {
      setIsSaved(SaveControlFromParent);
    }
  }, [SaveControlFromParent]);

  return (
    <button
      onClick={() => {
        setIsSaved((prev) => !prev);
        handleToggleSave();
      }}
      className={className}
    >
      {isSaved ? (
        <BookMarkOutlineIcon className={SaveIconClassName} />
      ) : (
        <BookMarkFillIcon className={SaveIconClassName} />
      )}
    </button>
  );
}

export default ToggleSave;
