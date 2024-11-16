import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const HomeFillIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.80952 20.9633H1C0.447715 20.9633 0 20.5156 0 19.9633V11.1565C0 10.9018 0.0972134 10.6566 0.2718 10.4711L9.39878 0.773713C9.79362 0.354199 10.4603 0.354199 10.8552 0.773712L19.8076 10.2856C19.9822 10.4711 20.0794 10.7162 20.0794 10.971V19.9633C20.0794 20.5156 19.6317 20.9633 19.0794 20.9633H14.0952C13.543 20.9633 13.0952 20.5156 13.0952 19.9633V15.0268C13.0952 15.0268 13.0952 12.244 10.127 12.244C6.63492 12.244 6.80952 15.0268 6.80952 15.0268V19.9633C6.80952 20.5156 6.36181 20.9633 5.80952 20.9633Z"
        fill="black"
      />
    </svg>
  );
};
