import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const NotificationFillIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.00878 0.0378198C9.38695 -0.328913 11.5869 2.06733 12.0001 3.08208C12.4133 2.06733 14.9087 -0.298215 17.9914 0.0378198C22.5703 0.536945 24.1893 4.60422 23.9827 7.43103C23.8084 9.81591 23.3629 11.9974 18.4046 16.5638C16.1132 18.6741 14.4928 20.0636 13.4399 20.9168C12.5773 21.6157 11.4229 21.6157 10.5603 20.9168C9.50743 20.0636 7.88702 18.6741 5.59559 16.5638C0.637289 11.9974 0.191793 9.81591 0.0175003 7.43103C-0.189091 4.60422 1.41107 0.536946 6.00878 0.0378198Z"
        fill="currentColor"
      />
    </svg>
  );
};
