import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const ProfileOutlineIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 8C10.6569 8 12 6.65685 12 5C12 3.34315 10.6569 2 9 2C7.34315 2 6 3.34315 6 5C6 6.65685 7.34315 8 9 8ZM9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 14C3.79086 14 2 15.7909 2 18V19C2 19.5523 1.55228 20 1 20C0.447715 20 0 19.5523 0 19V18C0 14.6863 2.68629 12 6 12H12C15.3137 12 18 14.6863 18 18V19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V18C16 15.7909 14.2091 14 12 14H6Z"
        fill="currentColor"
      />
    </svg>
  );
};
