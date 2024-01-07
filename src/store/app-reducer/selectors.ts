import {State} from '../../types/state.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {FILM_LIST} from '../../mocs/film-info.ts';

export const selectGenre = (state: State) => state[ReducerName.App].selectedGenre;
export const selectFilms = (state: State) => state[ReducerName.App].films;
export const selectPromo = (state: State) => state[ReducerName.App].promo;
export const selectMyFilms = (state: State) => state[ReducerName.App].films;
export const selectFilmById = (id?: string) => () => FILM_LIST.find((item) => item.id === id);
export const selectSimilarFilms = (id?: string) => (state: State) => {
  const film = state[ReducerName.App].films.find((item) => item.id === id);
  return state[ReducerName.App].films.filter((f) => f.genre === film?.genre && f.id !== id);
};
export const selectIsFilmsLoading = (state: State) => state[ReducerName.App].isFilmsLoading;
export const selectIsPromoLoading = (state: State) => state[ReducerName.App].isPromoLoading;
export const selectFilteredByGenreFilms = (state: State) => state[ReducerName.App].filteredFilms;
