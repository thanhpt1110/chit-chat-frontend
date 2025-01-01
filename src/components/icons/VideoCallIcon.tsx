import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const VideoCallIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="32"
      height="21"
      viewBox="0 0 32 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("default-icon", className)}
      {...props}
    >
      <path
        d="M31 4L22 11L31 18V4Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.2 1H3.8C2.2536 1 1 2.21523 1 3.71429V17.2857C1 18.7848 2.2536 20 3.8 20H19.2C20.7464 20 22 18.7848 22 17.2857V3.71429C22 2.21523 20.7464 1 19.2 1Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
