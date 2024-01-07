import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import configureAxios from '../services/api.ts';

const axios = configureAxios();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axios,
      },
    }),
  reducer: reducer,
});
