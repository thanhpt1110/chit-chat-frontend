import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const MicrophoneMutedIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="23"
      height="30"
      viewBox="0 0 23 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("default-icon", className)}
      {...props}
    >
      <path
        d="M11.5 1C10.5717 1 9.6815 1.40638 9.02513 2.12973C8.36875 2.85309 8 3.83416 8 4.85714V15.1429C8 16.1658 8.36875 17.1469 9.02513 17.8703C9.6815 18.5936 10.5717 19 11.5 19C12.4283 19 13.3185 18.5936 13.9749 17.8703C14.6313 17.1469 15 16.1658 15 15.1429V4.85714C15 3.83416 14.6313 2.85309 13.9749 2.12973C13.3185 1.40638 12.4283 1 11.5 1V1Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 12V14.6667C21 17.142 20.0518 19.516 18.364 21.2663C16.6761 23.0167 14.3869 24 12 24C9.61305 24 7.32387 23.0167 5.63604 21.2663C3.94821 19.516 3 17.142 3 14.6667V12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 24V29"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 29H17"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="20.5453"
        y="0.338684"
        width="2.37944"
        height="33.7731"
        rx="1.18972"
        transform="rotate(36.9595 20.5453 0.338684)"
        fill="currentColor"
      />
    </svg>
  );
};
