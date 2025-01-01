import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const VideoCallMuteIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="35"
      height="23"
      viewBox="0 0 35 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("default-icon", className)}
      {...props}
    >
      <path
        d="M34 5L25 12L34 19V5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.2 2H6.8C5.2536 2 4 3.21523 4 4.71429V18.2857C4 19.7848 5.2536 21 6.8 21H22.2C23.7464 21 25 19.7848 25 18.2857V4.71429C25 3.21523 23.7464 2 22.2 2Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="0.261627"
        y="20.2499"
        width="33.31"
        height="2.6"
        rx="1.3"
        transform="rotate(-36.1357 0.261627 20.2499)"
        fill="currentColor"
      />
    </svg>
  );
};
