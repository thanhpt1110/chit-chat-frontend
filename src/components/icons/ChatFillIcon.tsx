import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const ChatFillIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.29603 0.905845C1.91013 -0.195343 -0.638166 2.08549 0.192803 4.5784L1.45425 8.31949C1.59137 8.72615 1.97267 8.99997 2.40183 8.99997H11C11.5523 8.99997 12 9.44769 12 9.99997C12 10.5523 11.5523 11 11 11H2.40183C1.97267 11 1.59137 11.2738 1.45425 11.6805L0.192813 15.4216C-0.63816 17.9145 1.91013 20.1953 4.29603 19.0941L18.0983 12.7239C20.422 11.6514 20.422 8.34864 18.0983 7.27613L4.29603 0.905845Z"
        fill="currentColor"
      />
    </svg>
  );
};
