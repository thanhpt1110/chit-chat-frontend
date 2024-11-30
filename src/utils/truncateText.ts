export const truncateText = (rawText: string, maxLength: number): string => {
  if (rawText.length > maxLength) {
    return rawText.slice(0, maxLength) + "...";
  }
  return rawText;
};
