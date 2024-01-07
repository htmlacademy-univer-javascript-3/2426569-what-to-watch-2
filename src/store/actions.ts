import {createAction} from '@reduxjs/toolkit';
import {Actions} from '../types/action.ts';

export const changeGenre = createAction(
  Actions.SetGenre,
  (genre: string) => ({ payload: genre })
);

export const setAuthorizationStatus = createAction(
  Actions.SetAuthorizationStatus,
  (status: string) => ({payload: status})
);

export const setError = createAction(
  Actions.SetError,
  (error?: string) => ({ payload: error })
);
