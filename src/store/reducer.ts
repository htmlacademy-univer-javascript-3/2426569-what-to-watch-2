import {combineReducers} from '@reduxjs/toolkit';
import {ReducerName} from '../types/reducer-name';
import userReducer from './user-reducer/user-reducer';
import appReducer from './app-reducer/app-reducer';
import filmReducer from './film-reducer/film-reducer';

export const reducer = combineReducers({
  [ReducerName.App]: appReducer,
  [ReducerName.User]: userReducer,
  [ReducerName.Film]: filmReducer,
});
