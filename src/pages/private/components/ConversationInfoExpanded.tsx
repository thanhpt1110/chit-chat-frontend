import { twMerge } from "tailwind-merge";

type ConversationInfoExpandedProps = {
  isShow: boolean;
};

function ConversationInfoExpanded({ isShow }: ConversationInfoExpandedProps) {
  return (
    <div
      className={twMerge("flex flex-col w-96 px-4 py-4", !isShow && "hidden")}
    >
      <div className="font-semibold text-lg">Details</div>
      {/*  */}
    </div>
  );
}

export default ConversationInfoExpanded;
