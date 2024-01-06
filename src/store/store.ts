import {configureStore} from '@reduxjs/toolkit';
import Reducer from './reducer.ts';

export const store = configureStore({
  reducer: {
    app: Reducer,
  },
});
