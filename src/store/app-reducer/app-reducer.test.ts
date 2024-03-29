import {DEFAULT_GENRE} from '../../consts.ts';
import {filmsDetails, filmsList} from '../../mocs/film-info.ts';
import {AppReducerState} from '../../types/app-reducer-state.ts';
import {changeGenre, setError} from '../actions.ts';
import {addReview, fetchFilms, fetchPromo, login, logout, toggleFavorite} from '../api-action.ts';
import appReducer from './app-reducer.ts';

const mockFilm = filmsDetails[0];
const mockFilms = filmsList;

describe('app-reducer', () => {
  let state: AppReducerState;

  beforeEach(() => {
    state = {
      selectedGenre: DEFAULT_GENRE,
      films: [],
      filteredFilms: [],
      isFilmsLoading: false,
      isPromoLoading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        selectedGenre: DEFAULT_GENRE,
        films: [],
        filteredFilms: [],
        isFilmsLoading: false,
        isPromoLoading: false,
      });
  });

  describe('changeGenre test', () => {
    it('should change genre', () => {
      expect(appReducer(state, {type: changeGenre.type, payload: mockFilm.genre}).selectedGenre)
        .toEqual(mockFilm.genre);
    });
    it('changeGenre should set filtered filmsDetails', () => {
      expect(appReducer(state, {type: changeGenre.type, payload: mockFilm.genre}).filteredFilms)
        .toEqual([]);
    });
  });

  describe('setError test', () => {
    it('should set error', () => {
      expect(appReducer(state, {type: setError.type, payload: '123'}).error)
        .toEqual('123');
    });
  });

  describe('fetchFilms test', () => {
    it('should set isLoading true on pending', () => {
      expect(appReducer(state, {type: fetchFilms.pending.type, payload: mockFilms}).isFilmsLoading)
        .toEqual(true);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(appReducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).isFilmsLoading)
        .toEqual(false);
    });
    it('should set filmsDetails on fulfilled', () => {
      expect(appReducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).films)
        .toEqual(mockFilms);
    });
    it('should set filtered filmsDetails equal filmsDetails on fulfilled', () => {
      expect(appReducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).filteredFilms)
        .toEqual(mockFilms);
    });
  });

  describe('fetchPromo test', () => {
    it('should set promo on fulfilled', () => {
      expect(appReducer(state, {type: fetchPromo.fulfilled.type, payload: mockFilm}).promo)
        .toEqual(mockFilm);
    });
  });

  describe('toggleFavorite rejected test', () => {
    it('should set error on rejected', () => {
      expect(appReducer(state, {type: toggleFavorite.rejected.type, error: {message: 'Error message'}}).error)
        .toEqual('Error message');
    });
  });

  describe('login rejected test', () => {
    it('should set error on rejected', () => {
      expect(appReducer(state, {type: login.rejected.type, error: {message: 'Error message'}}).error)
        .toEqual('Error message');
    });
  });

  describe('logout rejected test', () => {
    it('should set error on rejected', () => {
      expect(appReducer(state, {type: logout.rejected.type, error: {message: 'Error message'}}).error)
        .toEqual('Error message');
    });
  });

  describe('addReview fulfilled test', () => {
    it('should set error to undefined and call backToFilm on fulfilled', () => {
      const backToFilmMock = vi.fn();
      const action = {
        type: addReview.fulfilled.type,
        payload: {backToFilm: backToFilmMock},
      };
      const newState = appReducer(state, action);
      expect(newState.error).toBeUndefined();
      expect(backToFilmMock).toHaveBeenCalled();
    });
  });

  describe('addReview rejected test', () => {
    it('should set error on rejected', () => {
      expect(appReducer(state, {type: addReview.rejected.type, error: {message: 'Error message'}}).error)
        .toEqual('Error message');
    });
  });
});
