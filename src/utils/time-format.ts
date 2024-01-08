import {SECONDS_IN_HOUR, SECONDS_IN_MINUTE} from '../consts';

export const formatDuration = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((timeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = Math.floor(timeInSeconds % SECONDS_IN_MINUTE);

  const formatTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  if (hours > 0) {
    return `-${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
  } else {
    return `-${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
  }
};

export const getDateString = (postDate: Date) =>
  `${postDate.toLocaleString('eng', {
    month: 'long',
  })} ${postDate.getDate()}, ${postDate.getFullYear()}`;
