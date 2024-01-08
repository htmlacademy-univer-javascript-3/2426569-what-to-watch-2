import {State} from '../../types/state';
import {ReducerName} from '../../types/reducer-name';

export const selectFilm = (state: State) => state[ReducerName.Film].film;
export const selectIsFilmLoading = (state: State) => state[ReducerName.Film].isFilmLoading;
export const selectSimilarFilms = (state: State) => state[ReducerName.Film].similarFilmsList;
export const selectIsSimilarFilmsLoading = (state: State) => state[ReducerName.Film].isSimilarFilmsLoading;
export const selectReviews = (state: State) => state[ReducerName.Film].reviewsList;
