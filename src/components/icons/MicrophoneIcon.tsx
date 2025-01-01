import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const MicrophoneIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="20"
      height="30"
      viewBox="0 0 20 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("default-icon", className)}
      {...props}
    >
      <path
        d="M9.5 1C8.57174 1 7.6815 1.40638 7.02513 2.12973C6.36875 2.85309 6 3.83416 6 4.85714V15.1429C6 16.1658 6.36875 17.1469 7.02513 17.8703C7.6815 18.5936 8.57174 19 9.5 19C10.4283 19 11.3185 18.5936 11.9749 17.8703C12.6313 17.1469 13 16.1658 13 15.1429V4.85714C13 3.83416 12.6313 2.85309 11.9749 2.12973C11.3185 1.40638 10.4283 1 9.5 1V1Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 12V14.6667C19 17.142 18.0518 19.516 16.364 21.2663C14.6761 23.0167 12.3869 24 10 24C7.61305 24 5.32387 23.0167 3.63604 21.2663C1.94821 19.516 1 17.142 1 14.6667V12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 24V29"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 29H15"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
