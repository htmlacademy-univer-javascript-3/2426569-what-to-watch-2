import {DEFAULT_GENRE} from '../consts';
import {FilmInfo} from '../types/film-info';

export const filterFilmsByGenre = (films: FilmInfo[], genre: string) => {
  if (genre === DEFAULT_GENRE) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};
