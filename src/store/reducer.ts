import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './user-reducer/user-reducer.ts';
import {ReducerName} from '../types/reducer-name.ts';
import appReducer from './app-reducer/app-reducer.ts';


export const reducer = combineReducers({
  [ReducerName.App]: appReducer,
  [ReducerName.User]: userReducer,
});
