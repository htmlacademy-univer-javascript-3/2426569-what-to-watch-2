import {createSlice} from '@reduxjs/toolkit';
import {checkAuth, fetchFavoriteFilms, login, logout} from '../api-action';
import {AuthStatus} from '../../types/auth-status';
import {dropToken, saveToken} from '../../services/token';
import {UserData} from '../../types/user-data';
import {FilmInfo} from '../../types/film-info';
import {setAuthStatus} from '../actions';

export interface UserReducerState {
  userData: UserData | null;
  authStatus: AuthStatus;
  favoriteFilms: FilmInfo[];
  favoriteCount: number;
}

const initialState: UserReducerState = {
  userData: null,
  authStatus: AuthStatus.NoAuth,
  favoriteFilms: [],
  favoriteCount: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { },
  extraReducers(builder) {
    builder
      .addCase(setAuthStatus, (state, action) => {
        state.authStatus = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.userData = null;
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.userData = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteCount = action.payload.length;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilms = [];
        state.favoriteCount = 0;
      });
  }
});

export default userSlice.reducer;
