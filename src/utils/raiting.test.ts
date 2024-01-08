import { convertFilmRating } from './raiting.ts';

describe('convertFilmRating', () => {
  it('should return "Awesome" for a rating of 10 or greater', () => {
    expect(convertFilmRating(10)).toBe('Awesome');
    expect(convertFilmRating(11)).toBe('Awesome');
  });

  it('should return "Very good" for a rating between 8 and 10', () => {
    expect(convertFilmRating(8.1)).toBe('Very good');
    expect(convertFilmRating(9.9)).toBe('Very good');
  });

  it('should return "Good" for a rating between 5 and 8', () => {
    expect(convertFilmRating(5)).toBe('Good');
    expect(convertFilmRating(7.9)).toBe('Good');
  });

  it('should return "Normal" for a rating between 3 and 5', () => {
    expect(convertFilmRating(3.1)).toBe('Normal');
    expect(convertFilmRating(4.9)).toBe('Normal');
  });

  it('should return "Bad" for a rating less than 3', () => {
    expect(convertFilmRating(2.9)).toBe('Bad');
    expect(convertFilmRating(0)).toBe('Bad');
  });
});

