import { IconProps } from "../../types/components.type";

export const BookMarkFillIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.5 0H3.5C2.39543 0 1.5 0.895431 1.5 2V24L12 20L22.5 24V2C22.5 0.895431 21.6046 0 20.5 0Z"
        fill="currentColor"
      />
    </svg>
  );
};
