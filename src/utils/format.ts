export const sliceText = (text: string, textLength: number) => {
  return text.length <= textLength
    ? text //
    : text.slice(0, textLength) + '...';
};
