import {DEFAULT_GENRE} from '../consts.ts';
import {FilmInfo} from '../types/film-info.ts';

export const filterFilmsByGenre = (films: FilmInfo[], genre: string) => {
  if (genre === DEFAULT_GENRE) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};
