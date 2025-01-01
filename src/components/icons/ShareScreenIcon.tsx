import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const ShareScreenIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="34"
      height="26"
      viewBox="0 0 34 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("default-icon", className)}
      {...props}
    >
      <rect
        x="1.5"
        y="1.5"
        width="31"
        height="23"
        rx="3.5"
        stroke="currentColor"
        stroke-width="3"
      />
      <path
        d="M17 17V9"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 14L17.5 9L23 14"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
