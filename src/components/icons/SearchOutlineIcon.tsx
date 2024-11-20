import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const SearchOutlineIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.99997 9C1.99997 5.13401 5.13398 2 8.99997 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 8.99997 16C5.13398 16 1.99997 12.866 1.99997 9ZM8.99997 3.8147e-06C4.02941 3.8147e-06 -3.05176e-05 4.02944 -3.05176e-05 9C-3.05176e-05 13.9706 4.02941 18 8.99997 18C11.3868 18 13.5567 17.0708 15.1676 15.5545C15.2035 15.6084 15.2453 15.6595 15.2929 15.7071L19.2929 19.7071C19.6834 20.0976 20.3166 20.0976 20.7071 19.7071C21.0976 19.3166 21.0976 18.6834 20.7071 18.2929L16.7071 14.2929C16.6218 14.2076 16.5249 14.1409 16.4214 14.0929C17.4172 12.6446 18 10.8904 18 9C18 4.02944 13.9705 3.8147e-06 8.99997 3.8147e-06Z"
        fill="currentColor"
      />
    </svg>
  );
};
