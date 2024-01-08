import {filmsList} from '../../mocs/film-info.ts';
import {AuthStatus} from '../../types/auth-status';
import {UserData} from '../../types/user-data.ts';
import {UserReducerState} from '../../types/user-reducer-state';
import {setAuthStatus} from '../actions';
import {checkAuth, fetchFavoriteFilms, login, logout, toggleFavorite} from '../api-action';
import userReducer from './user-reducer';


const mockFilms = filmsList;
const mockUser: UserData = {
  avatarUrl: 'https://example.com/avatar.jpg',
  email: 'user@example.com',
  name: 'John Doe',
  token: 'mockToken',
};

describe('user-reducer', () => {
  let state: UserReducerState;

  beforeEach(() => {
    state = {
      userData: null,
      authStatus: AuthStatus.NoAuth,
      favoriteFilms: [],
      favoriteCount: 0,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        userData: null,
        authStatus: AuthStatus.NoAuth,
        favoriteFilms: [],
        favoriteCount: 0,
      });
  });

  it('should set auth status', () => {
    const newAuthStatus = AuthStatus.Auth;
    const action = setAuthStatus(newAuthStatus);
    const newState = userReducer(state, action);

    expect(newState.authStatus).toEqual(newAuthStatus);
  });

  describe('checkAuth test', () => {
    it('should handle fulfilled', () => {
      const newState = userReducer(state, {type: checkAuth.fulfilled.type, payload: mockUser});
      expect(newState.userData).toEqual(mockUser);
      expect(newState.authStatus).toEqual(AuthStatus.Auth);
    });

    it('should handle rejected', () => {
      const newState = userReducer(state, {type: checkAuth.rejected.type});

      expect(newState.authStatus).toEqual(AuthStatus.NoAuth);
    });
  });


  it('should handle logout.fulfilled', () => {
    const newState = userReducer(state, {type: logout.fulfilled.type});

    expect(newState.userData).toBeNull();
    expect(newState.authStatus).toEqual(AuthStatus.NoAuth);
    expect(newState.favoriteFilms).toEqual([]);
    expect(newState.favoriteCount).toEqual(0);
  });

  it('should handle login.fulfilled', () => {
    const newState = userReducer(state, {type: login.fulfilled.type, payload: mockUser});

    expect(newState.userData).toEqual(mockUser);
    expect(newState.authStatus).toEqual(AuthStatus.Auth);
  });

  describe('fetchFavoriteFilms test', () => {
    it('should handle fulfilled', () => {
      const newState = userReducer(state, {type: fetchFavoriteFilms.fulfilled.type, payload: mockFilms});

      expect(newState.favoriteFilms).toEqual(mockFilms);
      expect(newState.favoriteCount).toEqual(mockFilms.length);
    });

    it('should handle rejected', () => {
      const newState = userReducer(state, {type: fetchFavoriteFilms.rejected.type});

      expect(newState.favoriteFilms).toEqual([]);
      expect(newState.favoriteCount).toEqual(0);
    });
  });

  describe('toggleFavorite test', () => {
    const toggleFavoriteInitialState: UserReducerState = {
      userData: mockUser,
      authStatus: AuthStatus.Auth,
      favoriteFilms: mockFilms.slice(0, 2),
      favoriteCount: 2,
    };

    it('should handle fulfilled  favoriteOn', () => {
      const newState = userReducer(toggleFavoriteInitialState, {
        type: toggleFavorite.fulfilled.type,
        payload: {isFavorite: false},
      });

      expect(newState.favoriteCount).toEqual(toggleFavoriteInitialState.favoriteCount - 1);
    });

    it('should handle fulfilled with favoriteOff', () => {
      const newState = userReducer(toggleFavoriteInitialState, {
        type: toggleFavorite.fulfilled.type,
        payload: {isFavorite: true},
      });
      expect(newState.favoriteCount).toEqual(toggleFavoriteInitialState.favoriteCount + 1);
    });
  });
});
