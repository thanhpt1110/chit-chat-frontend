import { IconProps } from "../../types/components.type";

export const ExploreFillIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.99998 20C15.5228 20 20 15.5228 20 9.99998C20 4.47712 15.5228 0 9.99998 0C4.47712 0 0 4.47712 0 9.99998C0 15.5228 4.47712 20 9.99998 20ZM8.00886 8.00886L15.1102 4.88964L11.9911 11.991L4.88979 15.1102L8.00886 8.00886Z"
        fill="black"
      />
      <path
        d="M9.99994 11.033C10.6335 11.033 11.1471 10.5194 11.1471 9.88581C11.1471 9.25225 10.6335 8.73865 9.99994 8.73865C9.36639 8.73865 8.85278 9.25225 8.85278 9.88581C8.85278 10.5194 9.36639 11.033 9.99994 11.033Z"
        fill="black"
      />
    </svg>
  );
};
