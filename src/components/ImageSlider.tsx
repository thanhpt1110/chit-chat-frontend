import { useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeftFillIcon } from "./icons/ChevronLeftFillIcon";
import { ChevronRightFillIcon } from "./icons/ChevronRightFillIcon";
import ImageWithFallback from "./ImageWithFallback";
import "./styles/carousel.css";

type ImageSliderProps = {
  images: string[];
  imageClassName?: string;
  className?: string;
};

const ImageSlider = ({
  images,
  imageClassName,
  className,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const isFirst = useMemo(() => currentIndex === 0, [currentIndex]);

  const isLast = useMemo(
    () => currentIndex === images.length - 1,
    [currentIndex, images]
  );

  return (
    <div className={twMerge("carousel-container", className)}>
      {/* Images */}
      <div
        className={twMerge("carousel-track")}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <ImageWithFallback
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={twMerge("carousel-image", imageClassName)}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={twMerge(
              "dot",
              currentIndex === index ? "dot-active" : "dot-inactive"
            )}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Prev - Next Button */}
      <div className="carousel-buttons">
        <div className="carousel-button">
          <button
            onClick={handlePrev}
            className={twMerge(
              "w-7 h-7 bg-white hover:bg-gray-300 opacity-40 ml-1 rounded-full flex items-center justify-center",
              isFirst && "hidden"
            )}
          >
            <ChevronLeftFillIcon className="h-3 w-3" />
          </button>
        </div>
        <div className="carousel-button">
          <button
            onClick={handleNext}
            className={twMerge(
              "w-7 h-7 bg-white hover:bg-gray-300 mr-1 opacity-40 rounded-full flex items-center justify-center",
              isLast && "hidden"
            )}
          >
            <ChevronRightFillIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
