import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const ExploreOutlineIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.0753 9.89283C9.41798 9.53371 8.61372 9.99804 8.59609 10.7468L8.47427 15.9189C8.45589 16.699 9.29823 17.1986 9.97399 16.8085L14.6359 14.117C15.3116 13.7268 15.3001 12.7475 14.6153 12.3734L10.0753 9.89283Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 0C3.13401 0 0 3.13401 0 7V15C0 18.866 3.13401 22 7 22H15C18.866 22 22 18.866 22 15V7C22 3.13401 18.866 0 15 0H7ZM15 2H14.2392L14.8321 2.98816L16.0704 5.11112H19.6309C18.8857 3.28608 17.0931 2 15 2ZM7.84876 2H11.9069L13.1076 4.00124L13.755 5.11112H9.68287L8.54642 3.16277L7.84876 2ZM2.36909 5.11112C2.94518 3.7002 4.14733 2.6114 5.63033 2.18992L6.8219 4.17588L7.36746 5.11112H2.36909ZM2 15V7.11112H8.53413L8.54489 7.12957L8.5765 7.11112H20V15C20 17.7614 17.7614 20 15 20H7C4.23858 20 2 17.7614 2 15Z"
        fill="black"
      />
    </svg>
  );
};
