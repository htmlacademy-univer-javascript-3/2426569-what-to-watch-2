import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {checkAuth, login, logout} from '../api-action.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {dropToken, saveToken} from '../../services/token.ts';
import {UserData} from '../../types/user-data.ts';

export interface UserReducerState {
  userData: UserData | null;
  authStatus: AuthStatus;
}

const initialState: UserReducerState = {
  userData: null,
  authStatus: AuthStatus.NoAuth
};

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
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
      });
  }
});

export const {changeAuthStatus} = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
