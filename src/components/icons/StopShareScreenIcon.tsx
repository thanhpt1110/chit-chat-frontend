import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const StopShareScreenIcon = ({ className, ...props }: IconProps) => {
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
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      />
      <path
        d="M20 17L13 9"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 9L13 17"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
