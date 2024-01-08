import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import configureAxios from '../services/api';

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
