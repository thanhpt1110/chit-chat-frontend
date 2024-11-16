import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const ChatOutlineIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.19281 6.5784C1.36184 4.08549 3.91014 1.80466 6.29604 2.90584L20.0983 9.27613C22.422 10.3486 22.422 13.6514 20.0983 14.7239L6.29604 21.0941C3.91014 22.1953 1.36185 19.9145 2.19282 17.4216L3.68378 12.9487C3.88905 12.3329 3.88905 11.6671 3.68378 11.0513L2.19281 6.5784ZM5.45792 4.72176L19.2602 11.0921C20.0347 11.4496 20.0347 12.5505 19.2602 12.908L5.45793 19.2782C4.66262 19.6453 3.8132 18.885 4.09019 18.054L5.58115 13.5812C5.64488 13.39 5.69674 13.1959 5.73672 13H14C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11H5.73671C5.69672 10.8041 5.64487 10.61 5.58115 10.4189L4.09018 5.94595C3.81319 5.11497 4.66262 4.3547 5.45792 4.72176Z"
        fill="currentColor"
      />
    </svg>
  );
};
