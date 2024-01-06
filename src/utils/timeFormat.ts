
export const formatDuration = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formatTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  if (hours > 0) {
    return `-${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
  } else {
    return `-${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
  }
};
