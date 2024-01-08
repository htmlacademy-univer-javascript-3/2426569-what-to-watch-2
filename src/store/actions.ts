import {createAction} from '@reduxjs/toolkit';
import {Actions} from '../types/action';
import {AuthStatus} from '../types/auth-status';

export const changeGenre = createAction(
  Actions.SetGenre,
  (genre: string) => ({ payload: genre })
);

export const setAuthStatus = createAction(
  Actions.SetAuthStatus,
  (status: AuthStatus) => ({payload: status})
);

export const setError = createAction(
  Actions.SetError,
  (error?: string) => ({ payload: error })
);
