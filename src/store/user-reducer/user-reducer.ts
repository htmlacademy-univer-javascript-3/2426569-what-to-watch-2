import {createSlice} from '@reduxjs/toolkit';
import {dropToken, saveToken} from '../../services/token';
import {AuthStatus} from '../../types/auth-status';
import {ReducerName} from '../../types/reducer-name.ts';
import {setAuthStatus} from '../actions';
import {checkAuth, fetchFavoriteFilms, login, logout, toggleFavorite} from '../api-action';
import {UserReducerState} from '../../types/user-reducer-state';

const initialState: UserReducerState = {
  userData: null,
  authStatus: AuthStatus.NoAuth,
  favoriteFilms: [],
  favoriteCount: 0,
  isFavoriteFilmsLoading: false,
};

const userSlice = createSlice({
  name: ReducerName.User,
  initialState,
  reducers: {},
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
        state.favoriteFilms = [];
        state.favoriteCount = 0;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.userData = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteCount = action.payload.length;
        state.isFavoriteFilmsLoading = false;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilms = [];
        state.favoriteCount = 0;
        state.isFavoriteFilmsLoading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favoriteCount += action.payload.isFavorite ? 1 : -1;
      });
  }
});


export default userSlice.reducer;
