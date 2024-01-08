import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_GENRE} from '../../consts';
import {AppReducerState} from '../../types/app-reducer-state.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {filterFilmsByGenre} from '../../utils/film-filter';
import {changeGenre, setError} from '../actions';

import {fetchFilms, fetchPromo, toggleFavorite} from '../api-action';

const initialState: AppReducerState = {
  selectedGenre: DEFAULT_GENRE,
  films: [],
  filteredFilms: [],
  isFilmsLoading: false,
  isPromoLoading: false,
};

const appSlice = createSlice({
  name: ReducerName.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(changeGenre, (state, action) => {
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
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (state.promo && action.payload.id === state.promo.id) {
          state.promo = action.payload;
        }
      });
  }
});
export default appSlice.reducer;
