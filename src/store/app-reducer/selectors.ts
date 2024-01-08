import {State} from '../../types/state';
import {ReducerName} from '../../types/reducer-name';

export const selectGenre = (state: State) => state[ReducerName.App].selectedGenre;
export const selectFilms = (state: State) => state[ReducerName.App].films;
export const selectPromo = (state: State) => state[ReducerName.App].promo;
export const selectIsFilmsLoading = (state: State) => state[ReducerName.App].isFilmsLoading;
export const selectIsPromoLoading = (state: State) => state[ReducerName.App].isPromoLoading;
export const selectFilteredByGenreFilms = (state: State) => state[ReducerName.App].filteredFilms;
