import {FilmDetailsInfo} from './film-details-info.ts';
import {FilmInfo} from './film-info.ts';
import {Review} from './review.ts';

export interface FilmReducerState {
  film: FilmDetailsInfo | null;
  reviewsList: Review[];
  similarFilmsList: FilmInfo[];

  isFilmLoading: boolean;
  isSimilarFilmsLoading: boolean;
}
