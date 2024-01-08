import {createSlice} from '@reduxjs/toolkit';
import {FilmInfo} from '../../types/film-info';
import {FilmDetailsInfo} from '../../types/film-details-info';
import {fetchFilm, fetchReviews, fetchSimilar, toggleFavorite} from '../api-action';
import {Review} from '../../types/review';

interface AppReducerState {
  film: FilmDetailsInfo | null;
  reviewsList: Review[];
  similarFilmsList: FilmInfo[];

  isFilmLoading: boolean;
  isSimilarFilmsLoading: boolean;
}

const initialState: AppReducerState = {
  film: null,
  reviewsList: [],
  similarFilmsList: [],

  isFilmLoading: false,
  isSimilarFilmsLoading: false,
};

const filmSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.isFilmLoading = false;
        state.film = action.payload;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.isFilmLoading = false;
      })
      .addCase(fetchSimilar.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.isSimilarFilmsLoading = false;
        state.similarFilmsList = action.payload;
      })
      .addCase(fetchSimilar.rejected, (state) => {
        state.isSimilarFilmsLoading = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewsList = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  }
});
export default filmSlice.reducer;
