import { useMediaQuery } from "react-responsive";
import screens from "../utils/theme/screens.config";

const breakpoints = screens;

export function useBreakpoint(
  breakpointKey: "sm" | "md" | "lg" | "xl" | "2xl"
) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<"sm" | "md" | "lg" | "xl" | "2xl">}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
