import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_GENRE} from '../../consts.ts';
import {FilmInfo} from '../../types/film-info.ts';
import {FilmShortInfo} from '../../types/film-details-info.ts';

import {fetchFilms, fetchPromo} from '../api-action.ts';
import {changeGenre} from '../actions.ts';
import {filterFilmsByGenre} from '../../utils/film-filter.ts';

interface AppReducerState {
  selectedGenre: string;
  error?: string;

  isFilmsLoading: boolean;
  films: FilmInfo[];
  filteredFilms: FilmInfo[];

  isPromoLoading: boolean;
  promo?: FilmShortInfo;
}

const initialState: AppReducerState = {
  selectedGenre: DEFAULT_GENRE,
  films: [],
  filteredFilms: [],
  isFilmsLoading: false,
  isPromoLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeGenre, (state, action: PayloadAction<string>) => {
        state.selectedGenre = action.payload;
        state.filteredFilms = filterFilmsByGenre(state.films, state.selectedGenre);
      })
      .addCase(fetchPromo.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.promo = action.payload;
      })
      .addCase(fetchPromo.rejected, (state, action) => {
        state.isPromoLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.films = action.payload;
        state.filteredFilms = filterFilmsByGenre(state.films, state.selectedGenre);
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.isFilmsLoading = false;
        state.error = action.error.message;
      });
  }
});
export default appSlice.reducer;
