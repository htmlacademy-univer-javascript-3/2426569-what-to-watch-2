import { formatDuration, getDateString } from './time-format.ts';

describe('formatDuration', () => {
  test('formats duration with hours, minutes, and seconds', () => {
    const durationInSeconds = 3665; // 1 hour, 1 minute, and 5 seconds
    const result = formatDuration(durationInSeconds);
    expect(result).toBe('-01:01:05');
  });

  test('formats duration with only minutes and seconds', () => {
    const durationInSeconds = 125; // 2 minutes and 5 seconds
    const result = formatDuration(durationInSeconds);
    expect(result).toBe('-02:05');
  });

  test('formats duration with only seconds', () => {
    const durationInSeconds = 45; // 45 seconds
    const result = formatDuration(durationInSeconds);
    expect(result).toBe('-00:45');
  });

  test('formats duration with leading zeros', () => {
    const durationInSeconds = 3610; // 1 hour and 10 seconds
    const result = formatDuration(durationInSeconds);
    expect(result).toBe('-01:00:10');
  });
});

describe('getDateString', () => {
  test('returns the formatted date string', () => {
    const postDate = new Date('2022-01-01T12:34:56');
    const result = getDateString(postDate);
    expect(result).toBe('January 1, 2022');
  });
});
