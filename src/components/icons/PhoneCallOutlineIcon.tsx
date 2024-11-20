import { IconProps } from "../../types/components.type";

export const PhoneCallOutlineIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8782 14.9919L11.0081 15.1218C13.2457 17.2882 15.1184 18.3056 16.6261 18.174L17.0605 17.7687C17.6785 17.2064 18.1444 16.85 18.4584 16.6994C19.112 16.3859 19.5707 16.3922 20.8094 17.0625C22.439 17.9442 23.5642 18.9691 24.1392 19.5441C24.6731 20.078 24.5072 20.9977 24.3197 21.4057L24.1955 21.6333C23.8619 22.2129 22.6521 24.1249 20.3334 24.4521C19.4523 24.5764 18.3399 24.4624 17.0357 24.0696C14.2419 23.1024 11.4598 21.3297 8.68932 18.7514L8.19661 18.2834L8.19197 18.288L7.95419 18.046L7.71199 17.808L7.71664 17.8034L7.24857 17.3107C4.67035 14.5402 2.89763 11.7581 1.93042 8.96428C1.53761 7.66006 1.42363 6.54772 1.54795 5.66655C1.89822 3.18383 4.06566 1.97241 4.46871 1.74671L4.50964 1.72362C4.85849 1.52245 5.88095 1.28585 6.45591 1.86082L6.72814 2.14078C7.32079 2.76756 8.18177 3.79378 8.93755 5.19059C9.6078 6.42934 9.61405 6.88801 9.30058 7.54161C9.11655 7.92534 8.625 8.53612 7.82595 9.37394C7.69439 10.8816 8.71179 12.7543 10.8782 14.9919Z"
        stroke="currentColor"
        stroke-width="2"
      />
    </svg>
  );
};
