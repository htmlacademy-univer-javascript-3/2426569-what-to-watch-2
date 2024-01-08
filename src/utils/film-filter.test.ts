import {filmsList} from '../mocs/film-info.ts';
import { filterFilmsByGenre } from './film-filter.ts';
import { DEFAULT_GENRE } from '../consts';

describe('filterFilmsByGenre', () => {
  const mockFilms = filmsList;

  test('returns all films when genre is DEFAULT_GENRE', () => {
    const result = filterFilmsByGenre(mockFilms, DEFAULT_GENRE);
    expect(result).toEqual(mockFilms);
  });

  test('returns films filtered by genre', () => {
    const result = filterFilmsByGenre(mockFilms, 'Comedy');
    expect(result).toHaveLength(1);
    expect(result).toContain(filmsList[2]);
  });

  test('returns an empty array when no films match the genre', () => {
    const result = filterFilmsByGenre(mockFilms, 'Sci-Fi');
    expect(result).toEqual([]);
  });
});

