import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const ProfileFillIcon = ({ className, ...props }: IconProps) => {
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
        d="M0 16V18C0 19.1046 0.895431 20 2 20H16C17.1046 20 18 19.1046 18 18V16C18 13.2386 15.7614 11 13 11H5C2.23858 11 0 13.2386 0 16Z"
        fill="currentColor"
      />
      <path
        d="M13.5 4.5C13.5 6.98528 11.4853 9 9 9C6.51472 9 4.5 6.98528 4.5 4.5C4.5 2.01472 6.51472 0 9 0C11.4853 0 13.5 2.01472 13.5 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
