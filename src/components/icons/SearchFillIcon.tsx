import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const SearchFillIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.6691 11.8346C18.6691 15.6092 15.6092 18.6691 11.8346 18.6691C8.05994 18.6691 5 15.6092 5 11.8346C5 8.05994 8.05994 5 11.8346 5C15.6092 5 18.6691 8.05994 18.6691 11.8346ZM17.6471 19.7684C16.0188 20.9634 14.0091 21.6691 11.8346 21.6691C6.40308 21.6691 2 17.266 2 11.8346C2 6.40308 6.40308 2 11.8346 2C17.266 2 21.6691 6.40308 21.6691 11.8346C21.6691 14.0091 20.9634 16.0188 19.7684 17.6471L25.097 22.9757C25.6828 23.5615 25.6828 24.5112 25.097 25.097C24.5112 25.6828 23.5615 25.6828 22.9757 25.097L17.6471 19.7684Z"
        fill="currentColor"
      />
    </svg>
  );
};
