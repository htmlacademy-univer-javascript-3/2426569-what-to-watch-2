// reducer.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State} from '../types/state.ts';
import {filterFilmsByGenre} from '../utils/filmFilter.ts';
import {DEFAULT_GENRE} from '../consts.ts';
import {fetchFilms} from './action.ts';
import {FilmInfo} from '../types/filmInfo.ts';
import {FilmShortInfo} from '../types/filmDetailsInfo.ts';
import {FILM_LIST} from '../mocs/filmInfo.ts';

interface AppState {
  selectedGenre: string;
  films: FilmInfo[];
  promo: FilmShortInfo;
  isFilmsLoading: boolean;
  error?: string;
}

const initialState: AppState = {
  selectedGenre: DEFAULT_GENRE,
  promo: FILM_LIST[0],
  films: [],
  isFilmsLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        // Add any fetched posts to the array
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.isFilmsLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {changeGenre} = appSlice.actions;
export const selectGenre = (state: State) => state.app.selectedGenre;
export const selectFilms = (state: State) => state.app.films;
export const selectPromo = (state: State) => state.app.promo;
export const selectMyFilms = (state: State) => state.app.films;
export const selectFilmById = (id?: string) => () => FILM_LIST.find((item) => item.id === id);

export const selectSimilarFilms = (id?: string) => (state: State) => {
  const film = state.app.films.find((item) => item.id === id);
  return state.app.films.filter((f) => f.genre === film?.genre && f.id !== id);
};
export const selectIsFilmsLoading = (state: State) => state.app.isFilmsLoading;
export const selectFilteredByGenreFilms = (state: State) => filterFilmsByGenre(state.app.films, state.app.selectedGenre);

const appReducer = appSlice.reducer;

export default appReducer;
