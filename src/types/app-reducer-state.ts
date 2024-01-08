import {FilmShortInfo} from './film-details-info.ts';
import {FilmInfo} from './film-info.ts';

export interface AppReducerState {
  selectedGenre: string;
  error?: string;

  isFilmsLoading: boolean;
  films: FilmInfo[];
  filteredFilms: FilmInfo[];

  isPromoLoading: boolean;
  promo?: FilmShortInfo;
}
