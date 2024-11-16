import { HTMLAttributes } from "react";

type ImageWithFallbackProps = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: HTMLAttributes<HTMLImageElement>["className"];
};
function ImageWithFallback({
  src,
  fallbackSrc = "/ChitChat.svg",
  alt,
  className = "h-11 w-11",
}: ImageWithFallbackProps) {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.src = fallbackSrc;
  };
  return (
    <img className={className} src={src} alt={alt} onError={handleError} />
  );
}

export default ImageWithFallback;
