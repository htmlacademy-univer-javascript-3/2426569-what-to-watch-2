// reducer.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/filmInfo.ts';
import {State} from '../types/state.ts';
import {FILM_LIST} from '../mocs/filmInfo.ts';
import {filterFilmsByGenre} from '../utils/filmFilter.ts';
import {DEFAULT_GENRE} from '../consts.ts';

interface AppState {
  genre: string;
  films: FilmInfo[];
}

const initialState: AppState = {
  genre: DEFAULT_GENRE,
  films: FILM_LIST, // Пока используем пустой список фильмов
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setFilms: (state, action: PayloadAction<FilmInfo[]>) => {
      state.films = action.payload;
    },
  },
});

export const {changeGenre, setFilms} = appSlice.actions;
export const selectGenre = (state: State) => state.app.genre;
export const selectFilms = (state: State) => state.app.films;
export const selectMyFilms = (state: State) => state.app.films;
export const selectFilteredByGenreFilms = (state: State) => filterFilmsByGenre(state.app.films, state.app.genre);

const appReducer = appSlice.reducer;

export default appReducer;
