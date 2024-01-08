
import {filmsDetails, filmsList} from '../../mocs/film-info.ts';
import reviews from '../../mocs/review.ts';
import {FilmReducerState} from '../../types/film-reducer-state.ts';
import {fetchFilm, fetchReviews, fetchSimilar} from '../api-action.ts';
import filmReducer from './film-reducer.ts';

const mockFilm = filmsDetails[0];
const mockFilms = filmsList;
const mockReviews = reviews;

describe('film-reducer', () => {
  let state: FilmReducerState;

  beforeEach(() => {
    state = {
      film: null,
      reviewsList: [],
      similarFilmsList: [],

      isFilmLoading: false,
      isSimilarFilmsLoading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        film: null,
        reviewsList: [],
        similarFilmsList: [],

        isFilmLoading: false,
        isSimilarFilmsLoading: false,
      });
  });

  describe('fetchFilm test', () => {
    it('should set isFilmLoading on pending', () => {
      expect(filmReducer(state, { type: fetchFilm.pending.type, payload: mockFilm }).isFilmLoading)
        .toEqual(true);
    });
    it('should load film on fulfilled', () => {
      const newState = filmReducer(state, { type: fetchFilm.fulfilled.type, payload: mockFilm });
      expect(newState.film).toEqual(mockFilm);
      expect(newState.isFilmLoading).toEqual(false);
    });
  });

  describe('fetchSimilar test', () => {
    it('should load similar filmsDetails on fulfilled', () => {
      expect(filmReducer(state, { type: fetchSimilar.pending.type, payload: mockFilms }).isSimilarFilmsLoading)
        .toEqual(true);
    });
    it('should load similar filmsDetails on fulfilled', () => {
      const newState = filmReducer(state, { type: fetchSimilar.fulfilled.type, payload: mockFilms });
      expect(newState.similarFilmsList).toEqual(mockFilms);
      expect(newState.isSimilarFilmsLoading).toEqual(false);
    });
  });

  describe('fetchReviews test', () => {
    it('should load reviews on fulfilled', () => {
      expect(filmReducer(state, { type: fetchReviews.fulfilled.type, payload: mockReviews }).reviewsList)
        .toMatchObject(mockReviews);
    });
  });
});
