import { twMerge } from "tailwind-merge";
import { IconProps } from "../../types/components.type";

export const HomeOutlineIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={twMerge("default-icon", className)}
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.10746 36.7422L7.88296 39.8378L7.88296 39.8378L5.10746 36.7422ZM78.6761 36.7422L75.9006 39.8378L75.9006 39.8378L78.6761 36.7422ZM43.2795 5.00579L40.504 8.10138L40.504 8.10139L43.2795 5.00579ZM40.504 5.00579L37.7285 1.91019L37.7285 1.91019L40.504 5.00579ZM33.5639 79.3621H29.4062V83.5197H33.5639V79.3621ZM50.2196 79.3621V83.5197H54.3772V79.3621H50.2196ZM8.57404 38.29C8.57404 38.8807 8.32276 39.4435 7.88296 39.8378L2.33197 33.6466C1.01258 34.8296 0.258724 36.5179 0.258724 38.29H8.57404ZM8.57404 77.2833V38.29H0.258724V77.2833H8.57404ZM6.49521 75.2045C7.6433 75.2045 8.57404 76.1352 8.57404 77.2833H0.258724C0.258724 80.7277 3.05092 83.5198 6.49521 83.5198V75.2045ZM77.2883 75.2045H6.49521V83.5198H77.2883V75.2045ZM75.2095 77.2833C75.2095 76.1352 76.1402 75.2045 77.2883 75.2045V83.5198C80.7326 83.5198 83.5248 80.7277 83.5248 77.2833H75.2095ZM75.2095 38.29V77.2833H83.5248V38.29H75.2095ZM75.9006 39.8378C75.4608 39.4435 75.2095 38.8807 75.2095 38.29H83.5248C83.5248 36.5179 82.771 34.8296 81.4516 33.6466L75.9006 39.8378ZM40.504 8.10139L75.9006 39.8378L81.4516 33.6466L46.055 1.9102L40.504 8.10139ZM43.2795 8.10139C42.4898 8.80943 41.2937 8.80943 40.504 8.10138L46.055 1.9102C43.6859 -0.213927 40.0976 -0.213926 37.7285 1.91019L43.2795 8.10139ZM7.88296 39.8378L43.2795 8.10139L37.7285 1.91019L2.33196 33.6466L7.88296 39.8378ZM37.7215 58.5424C37.7215 56.2393 39.5886 54.3722 41.8917 54.3722V46.0569C34.9962 46.0569 29.4062 51.6469 29.4062 58.5424H37.7215ZM37.7215 79.3621V58.5424H29.4062V79.3621H37.7215ZM50.2196 75.2044H33.5639V83.5197H50.2196V75.2044ZM46.0619 58.5424V79.3621H54.3772V58.5424H46.0619ZM41.8917 54.3722C44.1949 54.3722 46.0619 56.2393 46.0619 58.5424H54.3772C54.3772 51.6469 48.7873 46.0569 41.8917 46.0569V54.3722Z"
        fill="currentColor"
      />
    </svg>
  );
};
