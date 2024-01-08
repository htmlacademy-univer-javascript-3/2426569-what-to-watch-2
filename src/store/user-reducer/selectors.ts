import {State} from '../../types/state';
import {ReducerName} from '../../types/reducer-name';

export const selectUserData = (state: State) => state[ReducerName.User].userData;
export const selectAuthStatus = (state: State) => state[ReducerName.User].authStatus;
export const selectFavoriteFilms = (state: State) => state[ReducerName.User].favoriteFilms;
export const selectFavoriteCount = (state: State) => state[ReducerName.User].favoriteCount;
